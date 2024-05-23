import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, Text, Pressable, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import {PMSColorMatching} from "../components/ColorMatching"

export default function Cameras() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState('rgba(0, 0, 0, 0)');
  const [hexColor, setHexColor] = useState('#000000');
  const [pantoneColors, setPantoneColors] = useState([]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({
        quality: 1.0,
        exif: true,
        base64: true
      });
      handleImageProcessing(photo.uri);
      setModalVisible(true);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      handleImageProcessing(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const handleImageProcessing = async (uri) => {
    const { width, height } = await ImageManipulator.manipulateAsync(uri);

    const cropSize = 500;
    const originX = (width - cropSize) / 2;
    const originY = (height - cropSize) / 2;

    const finalCrop = await ImageManipulator.manipulateAsync(
      uri,
      [{ crop: { originX, originY, width: cropSize, height: cropSize } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    setImageUri(finalCrop.uri);
    convertImageToBase64(finalCrop.uri);
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      extractColorFromImage(base64);
    } catch (error) {
      console.error('Error Base64:', error);
    }
  };

  const extractColorFromImage = (base64) => {
    const draw = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          console.error('Fehler beim Abrufen des Canvas-Kontexts');
          return;
        }

        const img = new CanvasImage(canvas);
        img.src = `data:image/png;base64,${base64}`;

        img.addEventListener('load', () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const x = canvas.width / 2;
          const y = canvas.height / 2;

          try {
            const pixel = ctx.getImageData(x, y, 1, 1);
            pixel.then(innerObject => {
            console.log(innerObject);

            let pixelData = innerObject.data;

            console.log(pixelData);

            let red = pixelData[0];
            let green = pixelData[1];
            let blue = pixelData[2];
            let alpha = pixelData[3];

            const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            const hexColor = rgbaToHex(red, green, blue);
            setHexColor(hexColor);

         
            setDominantColor(colorString);
            const closestPantoneColors = PMSColorMatching(hexColor.replace('#', ''));
            setPantoneColors(closestPantoneColors);

          }).catch(error => {
            console.error("Fehler beim Zugriff auf _j:", error);
          });

          } catch (error) {
            console.error('Fehler beim Abrufen der Pixel-Daten:', error);
          }
        });

        img.addEventListener('error', (err) => {
          console.error('Fehler beim Laden des Bildes', err);
        });
      }
    };

    draw();
  };

  const rgbaToHex = (r, g, b) => {
    const toHex = (component) => {
      const hex = component.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const formatHexColor = (color) => {
    return color.length === 6 ? `#${color}` : color.length === 7 ? color : `#${color.slice(1, 7)}`;
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <MaterialCommunityIcons name="image-multiple" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <MaterialIcons name="photo-camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraType}>
            <FontAwesome6 name="rotate" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.focusCircle} />
      </Camera>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
        <View style={styles.modalView}>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
          <Image source={{ uri: imageUri }} style={styles.fullSizeImage} resizeMode="contain" />
          <View style={[styles.colorDisplay, { backgroundColor: dominantColor }]}>
            <Text style={styles.colorText}>Dominant Color: {dominantColor}</Text>
            <Text style={styles.colorText}>Hex Color: {hexColor}</Text>
          </View>
        </View>
        {pantoneColors.map((color, index) => (
              <View key={index} style={[styles.pantoneColorDisplay, { backgroundColor: formatHexColor(color.match(/\((.*)\)/)[1]) }]}>
                <Text style={styles.colorText}>{color} {index}</Text>
              </View>
            ))}
      </Modal>

      <Canvas
        ref={canvasRef}
        style={styles.canvas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  focusCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
  },
  preview: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  permissionButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSizeImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    zIndex: 100,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  colorText: {
    fontSize: 18,
    marginTop: 10,
  },
  canvas: {
    width: 1,
    height: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
  colorDisplay: {
    width: '80%',
    height: 100,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,

  },
  colorText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center', // Text zentrieren
  },

  pantoneColorDisplay: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
});

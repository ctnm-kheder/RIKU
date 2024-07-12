import 'regenerator-runtime/runtime';
import React, { useState, useRef,useCallback  } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Text, Pressable, Platform, Button } from 'react-native';
import { CameraView , CameraType, useCameraPermissions  } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import { PMSColorMatching } from "../components/ColorMatching"
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';


export default function Cameras({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState('rgba(0, 0, 0, 0)');
  const [hexColor, setHexColor] = useState('#000000');
  const [pantoneColors, setPantoneColors] = useState([]);
  const [error, setError] = useState('');
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [modalBackgroundColor, setModalBackgroundColor] = useState('#FFFFFF');  // Standard Weiß als Fallback
  const [isModalVisibleColor, setModalVisibleColor] = useState(false);

  useFocusEffect(
    useCallback(() => {
        async function initCamera() {
            const { status } = "granted"
            setHasPermission(status === 'granted');
        }

        initCamera();
    }, [])
);

if (!permission) {
  // Camera permissions are still loading.
  return <View />;
}

if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="grant permission" />
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
      setError(`Error Base64: ${error.message}`);
    }
  };

  const extractColorFromImage = (base64) => {
    const draw = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setError('Fehler beim Abrufen des Canvas-Kontexts');
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
              setError(`Fehler beim Zugriff auf _j: ${error.message}`);
            });

          } catch (error) {
            setError(`Fehler beim Abrufen der Pixel-Daten: ${error.message}`);
          }
        });

        img.addEventListener('error', (err) => {
          setError(`Fehler beim Laden des Bildes: ${err.message}`);
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


  const handleColorSelection = (color, colorName) => {
    setModalVisible(false);
    navigation.navigate('ColorDetails', { color, colorName });
  };
  
  return (
    <View style={styles.container}>
         {isFocused && (
        <CameraView ref={cameraRef} style={styles.camera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <ExpoImage
              source={require('../assets/photo-camera.png')}
              style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.focusCircle}>
          <ExpoImage
              source={require('../assets/sucher.png')}
              style={styles.sucher}
              />
          </TouchableOpacity>
        </CameraView>
       )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <SafeAreaView edges={["bottom"]}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>

          <View style={styles.headerLogs}>
          <ExpoImage
            source={require('../assets/scan-colour.png')}
            style={styles.logo}
          />
        </View>

            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>

            <View style={[styles.colorDisplay]}>
              <View style={[styles.pantoneColorDisplay, { backgroundColor: dominantColor, }]}>
                  <Text style={styles.colorText}>Your scanned colour</Text>
                  <TouchableOpacity style={styles.lupeButton}
                   onPress={() => {
                    setModalBackgroundColor(dominantColor); // Diese Zeile setzt die Hintergrundfarbe
                    setModalVisibleColor(true);
                  }}>
                    <ExpoImage
                      source={require('../assets/lupe.png')}
                      style={styles.lupeIcon}
                      />
                  </TouchableOpacity>
              </View>
            </View>

            <View style={styles.customade}>
              <Text style={styles.customadeText}>If you like to get exactly the scanned colour, plesae push the button</Text>
            </View>



            <View style={[{alignItems:"center", width:"100%",}]}>
                <Pressable style={[styles.button, {borderColor: hexColor, }]} onPress={() => handleColorSelection(hexColor, hexColor)}>
                  <Text style={styles.btnText}>Continue with Taylormade Food Colour</Text>
                </Pressable>
            </View>

            <View style={styles.customade}>
              <Text style={styles.customadeText}>Or choose the best matching Standard ERKA-Food-Colour</Text>
            </View>

              {pantoneColors.map((colorInfo, index) => (
                <View key={index} style={[styles.colorDisplay, styles.erkaColor]}>
                  <View key={index} style={[styles.pantoneColorDisplay, { backgroundColor: formatHexColor(colorInfo.rgb) }]}>
                    <Text style={styles.colorText}>Next matching ERKA-Colour {colorInfo.colour}</Text>
                    <TouchableOpacity style={styles.lupeButton}
                     onPress={() => {
                      setModalBackgroundColor(dominantColor); // Diese Zeile setzt die Hintergrundfarbe
                      setModalVisibleColor(true);
                    }}>
                    <ExpoImage
                      source={require('../assets/lupe.png')}
                      style={styles.lupeIcon}
                      />
                  </TouchableOpacity>
                  </View>
                    <Pressable style={[styles.button, {borderColor: `#${colorInfo.rgb}`, }]} onPress={() => handleColorSelection(formatHexColor(colorInfo.rgb), colorInfo.colour)}>
                      <Text style={styles.btnText}>Continue with Standard-ERKA Food Colour</Text>
                    </Pressable>

                </View>
              ))}

            </View>
        </Modal>

        <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisibleColor}
  onRequestClose={() => {
    setModalVisibleColor(!isModalVisibleColor);
  }}
>
  <View style={[styles.modalView, {backgroundColor: modalBackgroundColor}]}>
  <Pressable
  style={styles.closeButtonColoeModal}
  onPress={() => setModalVisibleColor(false)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <AntDesign name="arrowleft" size={20} color="#ffffff" />
    <Text style={styles.closeButtonTextColoeModal}>Back</Text>
  </View>
</Pressable>

  </View>
</Modal>

      </SafeAreaView>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  focusCircle: {
    width: 200,
    height: 200,
    borderWidth: 0,
    borderColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop:30,
  },

  closeButton: {
    padding: 10,
    zIndex: 100,
    width:"100%",
    alignItems:"flex-end"
  },
  closeButtonText: {
    backgroundColor: 'black',
    color: 'white',
    width:"15%",
    fontSize: 20,
    marginBottom:30,
    textAlign:"center"
  },
  colorText: {
    fontSize: 18,
    marginTop: 10,
    marginLeft:40,
    color:'white',
    textAlign:'left'
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
    width: '100%',
    paddingHorizontal:10,
    height: 100,
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginTop: 20,
  },
  pantoneColorDisplay: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    borderRadius:10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  colorMapping: {
    color:'black',
    fontSize: 18,
    textAlign: 'center',
  },
  customade: {
    width:"100%",
    marginTop:20,
  },
  customadeText: {
    fontSize: 19,
    color: '#222B2F',
    fontWeight:"400",
    lineHeight:28,
    paddingLeft:20,
    paddingRight:20,
  },
  erkaColor:{
    alignItems:'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width:"85%",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#EEEEEE',
    borderRadius: 50,
    borderWidth: 1,
    marginBottom:10,
    marginTop:20,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    marginRight: 10,
  },
  icon: {
    width:90,
    height:90,
    contentFit: 'contain',
  },
  sucher: {
    width:150,
    height:150,
    contentFit: 'contain',
  },
  buttonRescan:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal:20,
    marginTop:20,
    width:"auto",
    borderRadius: 20,
    backgroundColor: '#222B2F',
  },
  textRescan:{
    color:"#ffffff",
    fontSize: 20,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  lupeIcon:{
    width:30,
    height:30,
    contentFit: 'contain',
  },
  lupeButton:{
    width:"100%",
    display:"flex",
    alignItems:"flex-end",
    paddingRight:20,
  },
  closeButtonColoeModal:{
    padding: 15,
    zIndex: 100,
    width:"100%",
    alignItems:"flex-start"
  },
  closeButtonTextColoeModal:{
    color: 'white',
    width:"30%",
    fontSize: 19,
    marginLeft:15,
    fontWeight:"400"
  },
  headerLogs: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  logo: {
    width: '100%',
    height: 70,
    contentFit: 'contain',
  },
});

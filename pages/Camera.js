import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal, Button,Text  } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons,FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function Cameras() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

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
            quality: 1.0,  // Maximale Bildqualität
            exif: true,
            base64: true
          });
      handleImageProcessing(photo.uri);
      setModalVisible(true);
    }
  };

  const pickImage = async () => {
    // Berechtigung zur Mediengalerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    // Bildauswahl
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // setze das Bild-URI
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const handleImageProcessing = async (uri) => {
    const { width, height } = await ImageManipulator.manipulateAsync(uri);

    // Berechnen zentralen Ausschnitt
    const cropSize = 500;
    const originX = (width - cropSize) / 2;
    const originY = (height - cropSize) / 2;

    // Zuschneiden des Bildes auf den zentralen Bereich
    const finalCrop = await ImageManipulator.manipulateAsync(
      uri,
      [{ crop: { originX, originY, width: cropSize, height: cropSize } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );


    setImageUri(finalCrop.uri);
  };

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
         <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text  style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.fullSizeImage} resizeMode="contain" />
          <Text>{imageUri}</Text>
          <Button
            title="Schließen"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
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
    alignSelf: 'center'
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
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right:20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons,FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function Cameras() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

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
      let photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
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

    // Wenn der Benutzer nicht abbricht, setze das Bild-URI
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <MaterialCommunityIcons name="image-multiple" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <MaterialIcons name="photo-camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraType}>
            <FontAwesome6 name="rotate" size={30} color="white" />
          </TouchableOpacity>
        </View>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      </Camera>
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
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    padding:20,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  iconButton: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 50,
    marginHorizontal: 10,
    paddingLeft:20,
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
});

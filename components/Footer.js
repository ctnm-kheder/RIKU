import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { openUri } from './OpenUri'
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity  onPress={() => openUri('https://riku.com/')} style={styles.iconButton}  accessible={true} accessibilityLabel="Pick Image">
        <Image
          source={require('../assets/Ringe.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <View style={styles.centerIconContainer}>
        <TouchableOpacity  onPress={() => navigation.navigate('Scan your object')} style={styles.iconButton} accessible={true} accessibilityLabel="start Camera">
          <Image
            source={require('../assets/footer-start.png')}
            style={styles.logos}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => openUri('https://riku.com/farbmuster')} style={styles.iconButton}  accessible={true} accessibilityLabel="color swatch">
        <Image
          source={require('../assets/farbkreis.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    padding: 0,
    backgroundColor: '#222B2F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIconContainer: {
    position: 'relative',
    top: -50,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 70,
    height: 70,
    contentFit: 'contain',
  },
  logos: {
    width: 100,
    height: 100,
    contentFit: 'contain',
  },
});

export default Footer;

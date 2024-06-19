// components/StartHeader.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartHeader = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.headerContainer}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:"#f5f5f5",
    width: '100%',
    paddingHorizontal: 40,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default StartHeader;

// components/StartHeader.js
import React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native';

const StartHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
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
    paddingTop: 50,
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

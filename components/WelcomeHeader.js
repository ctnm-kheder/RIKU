// components/StartHeader.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartHeader = ({backgroundColor, logoSource }) => {
  return (
    <SafeAreaView edges={["top"]} style={[styles.headerContainer, { backgroundColor }]}>
      <Image 
        source={logoSource}
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
    width: '100%',
    paddingHorizontal: 40,
  },
  logo: {
    width: '75%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default StartHeader;

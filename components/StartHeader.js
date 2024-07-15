import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartHeader = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.headerContainer}>
      <Image 
        source={require('../assets/natural.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom:30,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:"#EEEEEE",
    width: '100%',
    paddingHorizontal: 40,
  },
  logo: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
});

export default StartHeader;

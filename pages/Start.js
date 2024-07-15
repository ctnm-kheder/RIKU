import React from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import Fontisto from 'react-native-vector-icons/Fontisto';

const { width, height } = Dimensions.get('window');

export default function Start({ navigation }) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textButton}>
            <Text style={styles.text}>
            New product ideas need new colours. Use this app to scan the winning colour for your next product directly from the object whose colour you like best. Whether it’s a special flower. the unusual colour of an exotic ornamental fish or an exquisite fabric for the fashion of tomorrow - our unique app can read over 16million shades and turns your scan into a colour suggestion that you can use to quickly and easily request a production-ready sample            </Text>
            <View style={styles.ButtonContainer}>
              <Pressable style={styles.button} onPress={() => navigation.navigate('Overview')}>
              <Image
                  source={require('../assets/Continue.png')}
                  style={styles.Continuebutton}
              />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.footerLogs}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor:"#EEEEEE"
  },
  content: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: height * 0.1,
    contentFit: 'contain',
  },
  Continuebutton:{
    width: '70%',
    height: height * 0.1,
    contentFit: 'contain',
  },
  footerLogs: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  textButton: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#222B2F',
    fontSize: 19,
    lineHeight: 28,
    fontWeight:"300",
    paddingBottom: '5%',
    textAlign: 'left',
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '0%',
    width: '70%',

  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

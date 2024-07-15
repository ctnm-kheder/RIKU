import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'expo-image';

const steps = [
  {
    key: 'scan',
    headline: 'First:',
    text: 'Scan your object with the camera of your device',
    icon: (
      <Image
        source={require('../assets/scanStart.png')}
        style={{width: 60,
            height:60,
            contentFit: 'contain',}}
      />
    ),
  },
  {
    key: 'check',
    headline: 'Second:',
    text: 'Check and compare the selected colour',
    icon: (
        <Image
          source={require('../assets/second-check.png')}
          style={{width: 60,
              height: 60,
              contentFit: 'contain',}}
        />
      ),
  },
  {
    key: 'request',
    headline: 'Third:',
    text: 'Request a free sample for exactly this colour',
    icon: (
        <Image
          source={require('../assets/third-request.png')}
          style={{width: 60,
              height: 60,
              contentFit: 'contain',}}
        />
      ),
  },
];

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View key={step.key} style={styles.step}>
          {typeof step.icon === 'string' ? (
            <MaterialIcon name={step.icon} size={40} color="#ee0051" />
          ) : (
            step.icon
          )}
          <View style={styles.textContainer}>
            <Text style={styles.headline}>{step.headline}</Text>
            <Text style={styles.text}>{step.text}</Text>
          </View>
        </View>
      ))}

      <Pressable style={styles.button} onPress={() => navigation.navigate('Camera')}>
      <Image
        source={require('../assets/scanning.png')}
        style={styles.buttonImg}
        />
      </Pressable>
      <View style={styles.footerLogs}>
        <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#EEEEEE"
  },
  step: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical:30,
  },
  textContainer: {
    marginLeft: 10,
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft:20,
  },
  text: {
    fontSize: 18,
    width: 180,
    fontWeight:"300",
    color: '#222B2F',
    marginLeft:20,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width:"80%",
    marginBottom:50,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'black',
    marginRight: 10,
    color: "#ee0051"
  },
  logo: {
    width: '70%',
    height: 100,
    contentFit: 'contain',
  },
  buttonImg:{
    width: '60%',
    height: 60,
    contentFit: 'contain',
  },
  footerLogs:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width:"100%",
  }
});

import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import { openUri } from '../components/OpenUri';

export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#ee0051', '#f9ae3e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Pressable
            style={styles.gradientButton}
            onPress={() => navigation.navigate('Scan your object')}
          >
            <View style={styles.btnContainer}>
              <Image
                source={require('../assets/scanStartWeiß.png')}
                style={styles.icon}
              />
              <Text style={styles.gradientBtnText}>SCAN YOUR{'\n'}COLOUR</Text>
            </View>
          </Pressable>
        </LinearGradient>

        <Pressable
          style={styles.button}
          onPress={() => openUri('https://riku.com/farbmuster')}>
            <View style={styles.btnContainer}>
              <Image
                source={require('../assets/farbmuster-no-border.png')}
                style={styles.icon}
              />
              <Text style={[styles.btnText, styles.btnTextErka]}>ERKA{'\n'}COLOURS</Text>
            </View>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => openUri('https://riku.com/')}>
            <View style={styles.btnContainer}>
              <Image
                source={require('../assets/Ringe.png')}
                style={styles.icon}
              />
              <Text style={[styles.btnText, styles.btnTextRinge]}>RINGE +{'\n'}KUHLMANN</Text>
            </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#EEEEEE"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 30,
    width:"100%"
  },
  gradient: {
    borderRadius: 20,
    marginVertical: 10,
    height: 128,
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    width:"100%",
    height: '100%',
  },
  gradientBtnText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    color: '#ffffff',
    flex: 0.7,  // 70% des verfügbaren Platzes
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    height: 128,
  },
  btnText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    flex: 0.7,  // 70% des verfügbaren Platzes
  },
  btnTextErka: {
    color: '#FF73A6',
  },
  btnTextRinge: {
    color: '#005482',
  },
  icon: {
    width: 50,
    height: 50,
    flex: 0.3,  // 30% des verfügbaren Platzes
    resizeMode: 'contain',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:40,
    justifyContent: 'center',
    flex: 1,  // Stellen Sie sicher, dass dieser Container flexibel ist
  }
});

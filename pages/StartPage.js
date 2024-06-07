import { StyleSheet, Text, View, Pressable } from 'react-native';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import { openUri } from '../components/OpenUri'
import { Image } from 'expo-image';

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
             <Image
                source={require('../assets/footer-start.png')}
                style={styles.icon}
            />
            <Text style={styles.gradientBtnText}>SCAN YOUR{'\n'}COLOUR</Text>
          </Pressable>
        </LinearGradient>

        <Pressable
          style={styles.button}
          onPress={() => openUri('https://riku.com/farbmuster')}>
           <Image
                source={require('../assets/tabler_color-start-swatch.png')}
                style={styles.icon}
            />
          <Text style={[styles.btnText, styles.btnTextErka]}>ERKA{'\n'}COLOURS</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => openUri('https://riku.com/')}>
           <Image
                source={require('../assets/Ringe.png')}
                style={styles.icon}
            />
          <Text style={[styles.btnText, styles.btnTextRinge]}>RINGE +{'\n'}KUHLMANN</Text>
        </Pressable>
      </View>
      <Footer style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 50,
  },
  gradient: {
    borderRadius: 20,
    marginVertical: 10,
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    height: 150,
  },
  gradientBtnText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: 0.25,
    color: '#ffffff',
    marginLeft: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    height: 150, // Set height to 50px
  },
  btnText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: 0.25,
    marginLeft: 30,
  },
  btnTextErka: {
    color:'#FF73A6'
  },
  btnTextRinge: {
    color:'#005482',
  },
  footer: {
    paddingHorizontal: 20,
  },
  icon: {
    width:50,
    height:50,
    contentFit: 'contain',
  }
});

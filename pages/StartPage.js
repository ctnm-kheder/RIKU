import { StyleSheet, Text, View,Pressable  } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Footer from '../components/Footer';



export default function Start({navigation}) {
  return (
        <View style={styles.container}>


            <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Scan your object')}>
                <Text style={styles.btnText}>Start scanning</Text>
                <Fontisto name="arrow-right-l" size={20} color="#ee0051" />
            </Pressable>
            <Footer />

        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    textContainer: {
        marginLeft: 10,
    },
    headline: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        width:180,
        opacity:0.5,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ee0051',
    },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: 'black',
        marginRight: 10,
      },
  });
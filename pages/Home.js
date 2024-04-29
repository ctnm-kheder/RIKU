import { StyleSheet, Text, View,Pressable  } from 'react-native';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const steps = [
    { key: 'scan', headline: 'First:', text: 'Scan your object with the camera of your device', icon: 'camera' },
    { key: 'check', headline: 'Second:', text: 'Check and compare the selected colour', icon: 'app-shortcut' },
    { key: 'request', headline: 'Third:', text: 'Request a free sample for exactly this colour', icon: 'opacity' },
  ];


export default function Home({navigation}) {
  return (
        <View style={styles.container}>
            {steps.map((step) => (
            <View key={step.key} style={styles.step}>
                <MaterialIcon  name={step.icon} size={70} color="#ee0051" />
                <View style={styles.textContainer}>
                <Text style={styles.headline}>{step.headline}</Text>
                <Text style={styles.text}>{step.text}</Text>
                </View>
            </View>
            ))}

            <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Camera')}>
                <Text style={styles.btnText}>Start scanning</Text>
                <Fontisto name="arrow-right-l" size={20} color="#ee0051" />
            </Pressable>


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
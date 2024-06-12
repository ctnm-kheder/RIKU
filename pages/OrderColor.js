import React,  { useState }  from 'react';
import { View, TextInput, Pressable, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'react-native-axios';

const ColorDetails = ({ route }) => {
    const { color, colorName } = route.params; // Get the color, type, and colorName passed as parameters

    const [formData, setFormData] = useState({
        companyName: '',
        fullName: '',
        email: '',
        postcodeCity: '',
        country: '',
        telephone: '',
        commentRequest: ''
    });

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3000/send-email', formData);
          
          console.log('Response from server:', response.data);
          alert('E-Mail sent successfully!');
        } catch (error) {
          console.error('Error sending E-Mail:', error);
          alert('E-Mail send failed. Please try again later.');
        }
      };
    

return (
    <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Company name"
                onChangeText={text => handleChange('companyName', text)}
                value={formData.companyName}
            />
            <TextInput
                style={styles.input}
                placeholder="Surname/First name"
                onChangeText={text => handleChange('fullName', text)}
                value={formData.fullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => handleChange('email', text)}
                value={formData.email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Postcode/City"
                onChangeText={text => handleChange('postcodeCity', text)}
                value={formData.postcodeCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={text => handleChange('country', text)}
                value={formData.country}
            />
            <TextInput
                style={styles.input}
                placeholder="Telephone"
                onChangeText={text => handleChange('telephone', text)}
                value={formData.telephone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Comment/Request"
                onChangeText={text => handleChange('commentRequest', text)}
                value={formData.commentRequest}
                multiline={true}
                numberOfLines={4}
            />

            <View style={styles.containerColor}>
                <View style={styles.firstView}>
                    <Text style={styles.colorText}>Desired colour:</Text>
                </View>

                <View style={[styles.secondView, {backgroundColor: color}]}>
                    <Text style={styles.colorTextSecond}>Custommade</Text>
                </View>
            </View>

            <Pressable style={styles.button}  onPress={handleSubmit}>
                <Text style={styles.colorText}>Send</Text>
            </Pressable>

            <Text style={[styles.colorText, {marginTop:10,}]}>We will automatically send a confirmation of your enquiry to your e-mail address</Text>

        </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20
    },
    input: {
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#cccccc',
        paddingHorizontal: 10,
        borderRadius: 4,
        fontSize:16,
    },
    textArea: {
        height: 100
    },
    containerColor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:20,
    },
    firstView: {
        flex: 4,
        marginRight:20,
        height:50,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondView: {
        flex: 6,
        height:50,
        backgroundColor: '#dee2e6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorText: {
        fontSize: 16,
        width: '100%',
        color:'#3B4256',
        textAlign:'center'
    },
    colorTextSecond:{
        fontSize: 16,
        width: '100%',
        color:'#fff',
        textAlign:'center'
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
});

export default ColorDetails;

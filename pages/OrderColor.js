import React, { useState } from 'react';
import {View, TextInput, Pressable, StyleSheet, ScrollView, Text, ActivityIndicator, Modal, Alert,BackHandler } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import { SelectCountry } from 'react-native-element-dropdown';

const ColorDetails = ({ route }) => {
    const navigation = useNavigation();

    const { color, colorName } = route.params;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const countries  = [
        {label: "Afghanistan",value: "Afghanistan"},
        {label: "Åland Islands",value: "Åland Islands"},
        { label: "Afghanistan", value: "Afghanistan" },
        { label: "Albania", value: "Albania" },
        { label: "Algeria", value: "Algeria" },
        { label: "American Samoa", value: "American Samoa" },
        { label: "Andorra", value: "Andorra" },
        { label: "Angola", value: "Angola" },
        { label: "Anguilla", value: "Anguilla" },
        { label: "Antarctica", value: "Antarctica" },
        { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
        { label: "Argentina", value: "Argentina" },
        { label: "Armenia", value: "Armenia" },
        { label: "Aruba", value: "Aruba" },
        { label: "Australia", value: "Australia" },
        { label: "Austria", value: "Austria" },
        { label: "Azerbaijan", value: "Azerbaijan" },
        { label: "Bahamas", value: "Bahamas" },
        { label: "Bahrain", value: "Bahrain" },
        { label: "Bangladesh", value: "Bangladesh" },
        { label: "Barbados", value: "Barbados" },
        { label: "Belarus", value: "Belarus" },
        { label: "Belgium", value: "Belgium" },
        { label: "Belize", value: "Belize" },
        { label: "Benin", value: "Benin" },
        { label: "Bermuda", value: "Bermuda" },
        { label: "Bhutan", value: "Bhutan" },
        { label: "Bolivia", value: "Bolivia" },
        { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
        { label: "Botswana", value: "Botswana" },
        { label: "Bouvet Island", value: "Bouvet Island" },
        { label: "Brazil", value: "Brazil" },
        { label: "British Indian Ocean Territory", value: "British Indian Ocean Territory" },
        { label: "Brunei Darussalam", value: "Brunei Darussalam" },
        { label: "Bulgaria", value: "Bulgaria" },
        { label: "Burkina Faso", value: "Burkina Faso" },
        { label: "Burundi", value: "Burundi" },
        { label: "Cambodia", value: "Cambodia" },
        { label: "Cameroon", value: "Cameroon" },
        { label: "Canada", value: "Canada" },
        { label: "Cape Verde", value: "Cape Verde" },
        { label: "Cayman Islands", value: "Cayman Islands" },
        { label: "Central African Republic", value: "Central African Republic" },
        { label: "Chad", value: "Chad" },
        { label: "Chile", value: "Chile" },
        { label: "China", value: "China" },
        { label: "Christmas Island", value: "Christmas Island" },
        { label: "Cocos (Keeling) Islands", value: "Cocos (Keeling) Islands" },
        { label: "Colombia", value: "Colombia" },
        { label: "Comoros", value: "Comoros" },
        { label: "Congo", value: "Congo" },
        { label: "Congo, Democratic Republic of the", value: "Congo, Democratic Republic of the" },
        { label: "Cook Islands", value: "Cook Islands" },
        { label: "Costa Rica", value: "Costa Rica" },
        { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
        { label: "Croatia", value: "Croatia" },
        { label: "Cuba", value: "Cuba" },
        { label: "Cyprus", value: "Cyprus" },
        { label: "Czech Republic", value: "Czech Republic" },
        { label: "Denmark", value: "Denmark" },
        { label: "Djibouti", value: "Djibouti" },
        { label: "Dominica", value: "Dominica" },
        { label: "Dominican Republic", value: "Dominican Republic" },
        { label: "Ecuador", value: "Ecuador" },
        { label: "Egypt", value: "Egypt" },
        { label: "El Salvador", value: "El Salvador" },
        { label: "Equatorial Guinea", value: "Equatorial Guinea" },
        { label: "Eritrea", value: "Eritrea" },
        { label: "Estonia", value: "Estonia" },
        { label: "Eswatini", value: "Eswatini" },
        { label: "Ethiopia", value: "Ethiopia" },
        { label: "Falkland Islands (Malvinas)", value: "Falkland Islands (Malvinas)" },
        { label: "Faroe Islands", value: "Faroe Islands" },
        { label: "Fiji", value: "Fiji" },
        { label: "Finland", value: "Finland" },
        { label: "France", value: "France" },
        { label: "French Guiana", value: "French Guiana" },
        { label: "French Polynesia", value: "French Polynesia" },
        { label: "French Southern Territories", value: "French Southern Territories" },
        { label: "Gabon", value: "Gabon" },
        { label: "Gambia", value: "Gambia" },
        { label: "Georgia", value: "Georgia" },
        { label: "Germany", value: "Germany" },
        { label: "Ghana", value: "Ghana" },
        { label: "Gibraltar", value: "Gibraltar" },
        { label: "Greece", value: "Greece" },
        { label: "Greenland", value: "Greenland" },
        { label: "Grenada", value: "Grenada" },
        { label: "Guadeloupe", value: "Guadeloupe" },
        { label: "Guam", value: "Guam" },
        { label: "Guatemala", value: "Guatemala" },
        { label: "Guernsey", value: "Guernsey" },
        { label: "Guinea", value: "Guinea" },
        { label: "Guinea-Bissau", value: "Guinea-Bissau" },
        { label: "Guyana", value: "Guyana" },
        { label: "Haiti", value: "Haiti" },
        { label: "Heard Island and McDonald Islands", value: "Heard Island and McDonald Islands" },
        { label: "Holy See", value: "Holy See" },
        { label: "Honduras", value: "Honduras" },
        { label: "Hong Kong", value: "Hong Kong" },
        { label: "Hungary", value: "Hungary" },
        { label: "Iceland", value: "Iceland" },
        { label: "India", value: "India" },
        { label: "Indonesia", value: "Indonesia" },
        { label: "Iran", value: "Iran" },
        { label: "Iraq", value: "Iraq" },
        { label: "Ireland", value: "Ireland" },
        { label: "Isle of Man", value: "Isle of Man" },
        { label: "Israel", value: "Israel" },
        { label: "Italy", value: "Italy" },
        { label: "Jamaica", value: "Jamaica" },
        { label: "Japan", value: "Japan" },
        { label: "Jersey", value: "Jersey" },
        { label: "Jordan", value: "Jordan" },
        { label: "Kazakhstan", value: "Kazakhstan" },
        { label: "Kenya", value: "Kenya" },
        { label: "Kiribati", value: "Kiribati" },
        { label: "Korea (Democratic People's Republic of)", value: "Korea (Democratic People's Republic of)" },
        { label: "Korea (Republic of)", value: "Korea (Republic of)" },
        { label: "Kuwait", value: "Kuwait" },
        { label: "Kyrgyzstan", value: "Kyrgyzstan" },
        { label: "Lao People's Democratic Republic", value: "Lao People's Democratic Republic" },
        { label: "Latvia", value: "Latvia" },
        { label: "Lebanon", value: "Lebanon" },
        { label: "Lesotho", value: "Lesotho" },
        { label: "Liberia", value: "Liberia" },
        { label: "Libya", value: "Libya" },
        { label: "Liechtenstein", value: "Liechtenstein" },
        { label: "Lithuania", value: "Lithuania" },
        { label: "Luxembourg", value: "Luxembourg" },
        { label: "Macao", value: "Macao" },
        { label: "Madagascar", value: "Madagascar" },
        { label: "Malawi", value: "Malawi" },
        { label: "Malaysia", value: "Malaysia" },
        { label: "Maldives", value: "Maldives" },
        { label: "Mali", value: "Mali" },
        { label: "Malta", value: "Malta" },
        { label: "Marshall Islands", value: "Marshall Islands" },
        { label: "Martinique", value: "Martinique" },
        { label: "Mauritania", value: "Mauritania" },
        { label: "Mauritius", value: "Mauritius" },
        { label: "Mayotte", value: "Mayotte" },
        { label: "Mexico", value: "Mexico" },
        { label: "Micronesia (Federated States of)", value: "Micronesia (Federated States of)" },
        { label: "Moldova (Republic of)", value: "Moldova (Republic of)" },
        { label: "Monaco", value: "Monaco" },
        { label: "Mongolia", value: "Mongolia" },
        { label: "Montenegro", value: "Montenegro" },
        { label: "Montserrat", value: "Montserrat" },
        { label: "Morocco", value: "Morocco" },
        { label: "Mozambique", value: "Mozambique" },
        { label: "Myanmar", value: "Myanmar" },
        { label: "Namibia", value: "Namibia" },
        { label: "Nauru", value: "Nauru" },
        { label: "Nepal", value: "Nepal" },
        { label: "Netherlands", value: "Netherlands" },
        { label: "New Caledonia", value: "New Caledonia" },
        { label: "New Zealand", value: "New Zealand" },
        { label: "Nicaragua", value: "Nicaragua" },
        { label: "Niger", value: "Niger" },
        { label: "Nigeria", value: "Nigeria" },
        { label: "Niue", value: "Niue" },
        { label: "Norfolk Island", value: "Norfolk Island" },
        { label: "Northern Mariana Islands", value: "Northern Mariana Islands" },
        { label: "Norway", value: "Norway" },
        { label: "Oman", value: "Oman" },
        { label: "Pakistan", value: "Pakistan" },
        { label: "Palau", value: "Palau" },
        { label: "Palestine, State of", value: "Palestine, State of" },
        { label: "Panama", value: "Panama" },
        { label: "Papua New Guinea", value: "Papua New Guinea" },
        { label: "Paraguay", value: "Paraguay" },
        { label: "Peru", value: "Peru" },
        { label: "Philippines", value: "Philippines" },
        { label: "Pitcairn", value: "Pitcairn" },
        { label: "Poland", value: "Poland" },
        { label: "Portugal", value: "Portugal" },
        { label: "Puerto Rico", value: "Puerto Rico" },
        { label: "Qatar", value: "Qatar" },
        { label: "Réunion", value: "Réunion" },
        { label: "Romania", value: "Romania" },
        { label: "Russian Federation", value: "Russian Federation" },
        { label: "Rwanda", value: "Rwanda" },
        { label: "Saint Barthélemy", value: "Saint Barthélemy" },
        { label: "Saint Helena, Ascension and Tristan da Cunha", value: "Saint Helena, Ascension and Tristan da Cunha" },
        { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
        { label: "Saint Lucia", value: "Saint Lucia" },
        { label: "Saint Martin (French part)", value: "Saint Martin (French part)" },
        { label: "Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon" },
        { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
        { label: "Samoa", value: "Samoa" },
        { label: "San Marino", value: "San Marino" },
        { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
        { label: "Saudi Arabia", value: "Saudi Arabia" },
        { label: "Senegal", value: "Senegal" },
        { label: "Serbia", value: "Serbia" },
        { label: "Seychelles", value: "Seychelles" },
        { label: "Sierra Leone", value: "Sierra Leone" },
        { label: "Singapore", value: "Singapore" },
        { label: "Sint Maarten (Dutch part)", value: "Sint Maarten (Dutch part)" },
        { label: "Slovakia", value: "Slovakia" },
        { label: "Slovenia", value: "Slovenia" },
        { label: "Solomon Islands", value: "Solomon Islands" },
        { label: "Somalia", value: "Somalia" },
        { label: "South Africa", value: "South Africa" },
        { label: "South Georgia and the South Sandwich Islands", value: "South Georgia and the South Sandwich Islands" },
        { label: "South Sudan", value: "South Sudan" },
        { label: "Spain", value: "Spain" },
        { label: "Sri Lanka", value: "Sri Lanka" },
        { label: "Sudan", value: "Sudan" },
        { label: "Suriname", value: "Suriname" },
        { label: "Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen" },
        { label: "Sweden", value: "Sweden" },
        { label: "Switzerland", value: "Switzerland" },
        { label: "Syrian Arab Republic", value: "Syrian Arab Republic" },
        { label: "Taiwan, Province of China", value: "Taiwan, Province of China" },
        { label: "Tajikistan", value: "Tajikistan" },
        { label: "Tanzania, United Republic of", value: "Tanzania, United Republic of" },
        { label: "Thailand", value: "Thailand" },
        { label: "Timor-Leste", value: "Timor-Leste" },
        { label: "Togo", value: "Togo" },
        { label: "Tokelau", value: "Tokelau" },
        { label: "Tonga", value: "Tonga" },
        { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
        { label: "Tunisia", value: "Tunisia" },
        { label: "Turkey", value: "Turkey" },
        { label: "Turkmenistan", value: "Turkmenistan" },
        { label: "Turks and Caicos Islands", value: "Turks and Caicos Islands" },
        { label: "Tuvalu", value: "Tuvalu" },
        { label: "Uganda", value: "Uganda" },
        { label: "Ukraine", value: "Ukraine" },
        { label: "United Arab Emirates", value: "United Arab Emirates" },
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "United States", value: "United States" },
        { label: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands" },
        { label: "Uruguay", value: "Uruguay" },
        { label: "Uzbekistan", value: "Uzbekistan" },
        { label: "Vanuatu", value: "Vanuatu" },
        { label: "Venezuela, Bolivarian Republic of", value: "Venezuela, Bolivarian Republic of" },
        { label: "Viet Nam", value: "Viet Nam" },
        { label: "Virgin Islands, British", value: "Virgin Islands, British" },
        { label: "Virgin Islands, U.S.", value: "Virgin Islands, U.S." },
        { label: "Wallis and Futuna", value: "Wallis and Futuna" },
        { label: "Western Sahara", value: "Western Sahara" },
        { label: "Yemen", value: "Yemen" },
        { label: "Zambia", value: "Zambia" },
        { label: "Zimbabwe", value: "Zimbabwe" }
    ];

    const [formData, setFormData] = useState({
        companyName: '',
        fullName: '',
        email: '',
        postcodeCity: '',
        street: '',
        country: 'Germany',
        telephone: '',
        commentRequest: '',
        orderColor: colorName,
    });


    const validateFormData = (formData) => {
        let errors = {};

        if (!formData.companyName.trim()) {
            errors.companyName = 'Firmenname ist erforderlich';
        }

        if (!formData.fullName.trim()) {
            errors.fullName = 'Vollständiger Name ist erforderlich';
        }

        if (!formData.email) {
            errors.email = 'E-Mail ist erforderlich';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Ungültige E-Mail-Adresse';
        }

        if (!formData.postcodeCity.trim()) {
            errors.postcodeCity = 'Postleitzahl/Stadt ist erforderlich';
        }
        if (!formData.street.trim()) {
            errors.street = 'Street ist erforderlich';
        }
        if (!formData.country.trim()) {
            errors.country = 'Land ist erforderlich';
        }

        if (!formData.telephone.trim()) {
            errors.telephone = 'Telefonnummer ist erforderlich';
        } else if (!/^\d+$/.test(formData.telephone)) {
            errors.telephone = 'Telefonnummer darf nur Zahlen enthalten';
        }

        return errors;

    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const closeModalAndExit = () => {
        hideModal();
        BackHandler.exitApp();
    };

    const closeModalAndGoHome = () => {
        hideModal();
        navigation.navigate('Welcome');
    };

    const handleSubmit = async () => {
        const errors = validateFormData(formData);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await axios.post('https://dodgerblue-ape-788741.hostingersite.com/index.php/sendmail', formData);
                showModal('please see your email account for conformation');
            } catch (error) {
                console.error('Error sending E-Mail:', error.response.data);
                if (error.response && error.response.data && error.response.data.errors) {
                    const message = error.response.data.errors.map(err => err.msg).join(", ");
                    showModal(`E-Mail send failed: ${message}. Please try again later.`);
                } else {
                    showModal('E-Mail send failed. Please try again later.');
                }
            }
            setIsSubmitting(false);
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Surname/name*"
                onChangeText={text => handleChange('fullName', text)}
                value={formData.fullName}
            />

            {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Company name*"
                onChangeText={text => handleChange('companyName', text)}
                value={formData.companyName}
            />

            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email*"
                onChangeText={text => handleChange('email', text)}
                value={formData.email}
                keyboardType="email-address"
            />

            {errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Telephone*"
                onChangeText={text => handleChange('telephone', text)}
                value={formData.telephone}
                keyboardType="phone-pad"
            />

        {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Street*"
                onChangeText={text => handleChange('street', text)}
                value={formData.street}
            />

            {errors.postcodeCity && <Text style={styles.errorText}>{errors.postcodeCity}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Postcode/City*"
                onChangeText={text => handleChange('postcodeCity', text)}
                value={formData.postcodeCity}
            />


            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
           <View style={styles.pickerContainer}>
                <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    maxHeight={300}
                    value={formData.country}
                    data={countries}
                    valueField="label"
                    labelField="label"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={(itemValue) => handleChange('country', itemValue.value)}
                />
            </View>

            <View style={styles.containerColor}>
                <View style={styles.firstView}>
                    <Text style={styles.colorText}>Your desired Colour</Text>
                </View>

                <View style={[styles.secondView, { backgroundColor: color }]}>
                    <Text style={styles.colorTextSecond}>Taylormade</Text>
                </View>
            </View>

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Comment/Request"
                onChangeText={text => handleChange('commentRequest', text)}
                value={formData.commentRequest}
                multiline={true}
                numberOfLines={4}
            />

            <Pressable style={[styles.button, { borderColor: color }]} onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                    <ActivityIndicator size="large" color={color} />
                ) : (
                    <Text style={styles.colorText}>Send</Text>
                )}
            </Pressable>
            <Text style={[styles.colorText, {marginTop:10,}]}>We will automatically send a confirmation of your enquiry to your e-mail address</Text>
            <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={hideModal}
>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.Modalbutton, styles.buttonContinue]}
                    onPress={closeModalAndGoHome}
                >
                    <Text style={styles.textStyle}>Continue scanning</Text>
                </Pressable>
                <Pressable
                    style={[styles.Modalbutton, styles.buttonClose]}
                    onPress={closeModalAndExit}
                >
                    <Text style={styles.textStyle}>Close App</Text>
                </Pressable>
            </View>
        </View>
    </View>
</Modal>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20,
        backgroundColor:"#EEEEEE",
    },
    input: {
        height: 50,
        marginBottom: 12,
        fontWeight:"400",
        borderWidth: 1,
        borderColor: '#F8FAFC',
        backgroundColor:"#F8FAFC",
        paddingHorizontal: 10,
        borderRadius: 4,
        fontSize: 16,
    },
    textArea: {
        height: 100
    },
    containerColor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    firstView: {
        flex: 5,
        marginRight: 20,
        height: 50,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondView: {
        flex: 5,
        height: 50,
        backgroundColor: '#dee2e6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorText: {
        fontSize: 16,
        width: '100%',
        color: '#3B4256',
        textAlign: 'center'
    },
    colorTextSecond: {
        fontSize: 16,
        width: '100%',
        color: '#fff',
        textAlign: 'center'
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
    },
    errorText: {
        color: 'red',
        paddingBottom: 10,
    },
   centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignItems:"center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width:"90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
    },

    buttonClose: {
        backgroundColor: "#f44336",
    },
    buttonContinue: {
        backgroundColor: "black",
    },
    textStyle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 16,
        width: '100%',
        textAlign: "center"
    },
    Modalbutton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        elevation: 2,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#F8FAFC',
        backgroundColor:"#F8FAFC",
        borderRadius: 4,
        marginBottom: 12,
    },

    dropdown: {
        height: 50,
        width: "100%",
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
});

export default ColorDetails;

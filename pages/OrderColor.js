import React, { useState } from 'react';
import {View, TextInput, Pressable, StyleSheet, ScrollView, Text, ActivityIndicator, Modal, Alert,BackHandler } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const ColorDetails = ({ route }) => {
    const navigation = useNavigation();

    const { color, colorName } = route.params;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const countries = [
        {label: "Afghanistan",value: "AF"},
        {label: "Åland Islands",value: "AX"},
        {label: "Albania",value: "AL"},
        {label: "Algeria",value: "DZ"},
        {label: "American Samoa",value: "AS"},
        {label: "Andorra",value: "AD"},
        {label: "Angola",value: "AO"},
        {label: "Anguilla",value: "AI"},
        {label: "Antarctica",value: "AQ"},
        {label: "Antigua & Barbuda",value: "AG"},
        {label: "Argentina",value: "AR"},
        {label: "Armenia",value: "AM"},
        {label: "Aruba",value: "AW"},
        {label: "Australia",value: "AU"},
        {label: "Austria",value: "AT"},
        {label: "Azerbaijan",value: "AZ"},
        {label: "Bahamas",value: "BS"},
        {label: "Bahrain",value: "BH"},
        {label: "Bangladesh",value: "BD"},
        {label: "Barbados",value: "BB"},
        {label: "Belarus",value: "BY"},
        {label: "Belgium",value: "BE"},
        {label: "Belize",value: "BZ"},
        {label: "Benin",value: "BJ"},
        {label: "Bermuda",value: "BM"},
        {label: "Bhutan",value: "BT"},
        {label: "Bolivia",value: "BO"},
        {label: "Caribbean Netherlands",value: "BQ"},
        {label: "Bosnia & Herzegovina",value: "BA"},
        {label: "Botswana",value: "BW"},
        {label: "Bouvet Island",value: "BV"},
        {label: "Brazil",value: "BR"},
        {label: "British Indian Ocean Territory",value: "IO"},
        {label: "Brunei",value: "BN"},
        {label: "Bulgaria",value: "BG"},
        {label: "Burkina Faso",value: "BF"},
        {label: "Burundi",value: "BI"},
        {label: "Cambodia",value: "KH"},
        {label: "Cameroon",value: "CM"},
        {label: "Canada",value: "CA"},
        {label: "Cape Verde",value: "CV"},
        {label: "Cayman Islands",value: "KY"},
        {label: "Central African Republic",value: "CF"},
        {label: "Chad",value: "TD"},
        {label: "Chile",value: "CL"},
        {label: "China",value: "CN"},
        {label: "Christmas Island",value: "CX"},
        {label: "Cocos (Keeling) Islands",value: "CC"},
        {label: "Colombia",value: "CO"},
        {label: "Comoros",value: "KM"},
        {label: "Congo - Brazzaville",value: "CG"},
        {label: "Congo - Kinshasa",value: "CD"},
        {label: "Cook Islands",value: "CK"},
        {label: "Costa Rica",value: "CR"},
        {label: "Côte d’Ivoire",value: "CI"},
        {label: "Croatia",value: "HR"},
        {label: "Cuba",value: "CU"},
        {label: "Curaçao",value: "CW"},
        {label: "Cyprus",value: "CY"},
        {label: "Czechia",value: "CZ"},
        {label: "Denmark",value: "DK"},
        {label: "Djibouti",value: "DJ"},
        {label: "Dominica",value: "DM"},
        {label: "Dominican Republic",value: "DO"},
        {label: "Ecuador",value: "EC"},
        {label: "Egypt",value: "EG"},
        {label: "El Salvador",value: "SV"},
        {label: "Equatorial Guinea",value: "GQ"},
        {label: "Eritrea",value: "ER"},
        {label: "Estonia",value: "EE"},
        {label: "Ethiopia",value: "ET"},
        {label: "Falkland Islands (Islas Malvinas)",value: "FK"},
        {label: "Faroe Islands",value: "FO"},
        {label: "Fiji",value: "FJ"},
        {label: "Finland",value: "FI"},
        {label: "France",value: "FR"},
        {label: "French Guiana",value: "GF"},
        {label: "French Polynesia",value: "PF"},
        {label: "French Southern Territories",value: "TF"},
        {label: "Gabon",value: "GA"},
        {label: "Gambia",value: "GM"},
        {label: "Georgia",value: "GE"},
        {label: "Germany",value: "DE"},
        {label: "Ghana",value: "GH"},
        {label: "Gibraltar",value: "GI"},
        {label: "Greece",value: "GR"},
        {label: "Greenland",value: "GL"},
        {label: "Grenada",value: "GD"},
        {label: "Guadeloupe",value: "GP"},
        {label: "Guam",value: "GU"},
        {label: "Guatemala",value: "GT"},
        {label: "Guernsey",value: "GG"},
        {label: "Guinea",value: "GN"},
        {label: "Guinea-Bissau",value: "GW"},
        {label: "Guyana",value: "GY"},
        {label: "Haiti",value: "HT"},
        {label: "Heard & McDonald Islands",value: "HM"},
        {label: "Vatican City",value: "VA"},
        {label: "Honduras",value: "HN"},
        {label: "Hong Kong",value: "HK"},
        {label: "Hungary",value: "HU"},
        {label: "Iceland",value: "IS"},
        {label: "India",value: "IN"},
        {label: "Indonesia",value: "ID"},
        {label: "Iran",value: "IR"},
        {label: "Iraq",value: "IQ"},
        {label: "Ireland",value: "IE"},
        {label: "Isle of Man",value: "IM"},
        {label: "Israel",value: "IL"},
        {label: "Italy",value: "IT"},
        {label: "Jamaica",value: "JM"},
        {label: "Japan",value: "JP"},
        {label: "Jersey",value: "JE"},
        {label: "Jordan",value: "JO"},
        {label: "Kazakhstan",value: "KZ"},
        {label: "Kenya",value: "KE"},
        {label: "Kiribati",value: "KI"},
        {label: "North Korea",value: "KP"},
        {label: "South Korea",value: "KR"},
        {label: "Kosovo",value: "XK"},
        {label: "Kuwait",value: "KW"},
        {label: "Kyrgyzstan",value: "KG"},
        {label: "Laos",value: "LA"},
        {label: "Latvia",value: "LV"},
        {label: "Lebanon",value: "LB"},
        {label: "Lesotho",value: "LS"},
        {label: "Liberia",value: "LR"},
        {label: "Libya",value: "LY"},
        {label: "Liechtenstein",value: "LI"},
        {label: "Lithuania",value: "LT"},
        {label: "Luxembourg",value: "LU"},
        {label: "Macao",value: "MO"},
        {label: "North Macedonia",value: "MK"},
        {label: "Madagascar",value: "MG"},
        {label: "Malawi",value: "MW"},
        {label: "Malaysia",value: "MY"},
        {label: "Maldives",value: "MV"},
        {label: "Mali",value: "ML"},
        {label: "Malta",value: "MT"},
        {label: "Marshall Islands",value: "MH"},
        {label: "Martinique",value: "MQ"},
        {label: "Mauritania",value: "MR"},
        {label: "Mauritius",value: "MU"},
        {label: "Mayotte",value: "YT"},
        {label: "Mexico",value: "MX"},
        {label: "Micronesia",value: "FM"},
        {label: "Moldova",value: "MD"},
        {label: "Monaco",value: "MC"},
        {label: "Mongolia",value: "MN"},
        {label: "Montenegro",value: "ME"},
        {label: "Montserrat",value: "MS"},
        {label: "Morocco",value: "MA"},
        {label: "Mozambique",value: "MZ"},
        {label: "Myanmar (Burma)",value: "MM"},
        {label: "Namibia",value: "NA"},
        {label: "Nauru",value: "NR"},
        {label: "Nepal",value: "NP"},
        {label: "Netherlands",value: "NL"},
        {label: "Curaçao",value: "AN"},
        {label: "New Caledonia",value: "NC"},
        {label: "New Zealand",value: "NZ"},
        {label: "Nicaragua",value: "NI"},
        {label: "Niger",value: "NE"},
        {label: "Nigeria",value: "NG"},
        {label: "Niue",value: "NU"},
        {label: "Norfolk Island",value: "NF"},
        {label: "Northern Mariana Islands",value: "MP"},
        {label: "Norway",value: "NO"},
        {label: "Oman",value: "OM"},
        {label: "Pakistan",value: "PK"},
        {label: "Palau",value: "PW"},
        {label: "Palestine",value: "PS"},
        {label: "Panama",value: "PA"},
        {label: "Papua New Guinea",value: "PG"},
        {label: "Paraguay",value: "PY"},
        {label: "Peru",value: "PE"},
        {label: "Philippines",value: "PH"},
        {label: "Pitcairn Islands",value: "PN"},
        {label: "Poland",value: "PL"},
        {label: "Portugal",value: "PT"},
        {label: "Puerto Rico",value: "PR"},
        {label: "Qatar",value: "QA"},
        {label: "Réunion",value: "RE"},
        {label: "Romania",value: "RO"},
        {label: "Russia",value: "RU"},
        {label: "Rwanda",value: "RW"},
        {label: "St. Barthélemy",value: "BL"},
        {label: "St. Helena",value: "SH"},
        {label: "St. Kitts & Nevis",value: "KN"},
        {label: "St. Lucia",value: "LC"},
        {label: "St. Martin",value: "MF"},
        {label: "St. Pierre & Miquelon",value: "PM"},
        {label: "St. Vincent & Grenadines",value: "VC"},
        {label: "Samoa",value: "WS"},
        {label: "San Marino",value: "SM"},
        {label: "São Tomé & Príncipe",value: "ST"},
        {label: "Saudi Arabia",value: "SA"},
        {label: "Senegal",value: "SN"},
        {label: "Serbia",value: "RS"},
        {label: "Serbia",value: "CS"},
        {label: "Seychelles",value: "SC"},
        {label: "Sierra Leone",value: "SL"},
        {label: "Singapore",value: "SG"},
        {label: "Sint Maarten",value: "SX"},
        {label: "Slovakia",value: "SK"},
        {label: "Slovenia",value: "SI"},
        {label: "Solomon Islands",value: "SB"},
        {label: "Somalia",value: "SO"},
        {label: "South Africa",value: "ZA"},
        {label: "South Georgia & South Sandwich Islands",value: "GS"},
        {label: "South Sudan",value: "SS"},
        {label: "Spain",value: "ES"},
        {label: "Sri Lanka",value: "LK"},
        {label: "Sudan",value: "SD"},
        {label: "Suriname",value: "SR"},
        {label: "Svalbard & Jan Mayen",value: "SJ"},
        {label: "Eswatini",value: "SZ"},
        {label: "Sweden",value: "SE"},
        {label: "Switzerland",value: "CH"},
        {label: "Syria",value: "SY"},
        {label: "Taiwan",value: "TW"},
        {label: "Tajikistan",value: "TJ"},
        {label: "Tanzania",value: "TZ"},
        {label: "Thailand",value: "TH"},
        {label: "Timor-Leste",value: "TL"},
        {label: "Togo",value: "TG"},
        {label: "Tokelau",value: "TK"},
        {label: "Tonga",value: "TO"},
        {label: "Trinidad & Tobago",value: "TT"},
        {label: "Tunisia",value: "TN"},
        {label: "Turkey",value: "TR"},
        {label: "Turkmenistan",value: "TM"},
        {label: "Turks & Caicos Islands",value: "TC"},
        {label: "Tuvalu",value: "TV"},
        {label: "Uganda",value: "UG"},
        {label: "Ukraine",value: "UA"},
        {label: "United Arab Emirates",value: "AE"},
        {label: "United Kingdom",value: "GB"},
        {label: "United States",value: "US"},
        {label: "U.S. Outlying Islands",value: "UM"},
        {label: "Uruguay",value: "UY"},
        {label: "Uzbekistan",value: "UZ"},
        {label: "Vanuatu",value: "VU"},
        {label: "Venezuela",value: "VE"},
        {label: "Vietnam",value: "VN"},
        {label: "British Virgin Islands",value: "VG"},
        {label: "U.S. Virgin Islands",value: "VI"},
        {label: "Wallis & Futuna",value: "WF"},
        {label: "Western Sahara",value: "EH"},
        {label: "Yemen",value: "YE"},
        {label: "Zambia",value: "ZM"},
        {label: "Zimbabwe",value: "ZW"}
    ];

    const [formData, setFormData] = useState({
        companyName: '',
        fullName: '',
        email: '',
        postcodeCity: '',
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
        navigation.navigate('Start');
    };

    const handleSubmit = async () => {
        const errors = validateFormData(formData);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await axios.post('https://api-wt3a.onrender.com/send-email', formData);
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

            {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Company name*"
                onChangeText={text => handleChange('companyName', text)}
                value={formData.companyName}
            />

            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Surname/First name*"
                onChangeText={text => handleChange('fullName', text)}
                value={formData.fullName}
            />

            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email*"
                onChangeText={text => handleChange('email', text)}
                value={formData.email}
                keyboardType="email-address"
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
                <Picker
                    selectedValue={formData.country}
                    onValueChange={(itemValue, itemIndex) => handleChange('country', itemValue)}
                    style={styles.picker}>
                    {countries.map((country, index) => (
                        <Picker.Item key={index} label={country.label} value={country.label} />
                    ))}
                </Picker>
            </View>

            {errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Telephone*"
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

                <View style={[styles.secondView, { backgroundColor: color }]}>
                    <Text style={styles.colorTextSecond}>Custommade</Text>
                </View>
            </View>

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
        paddingTop: 20
    },
    input: {
        height: 50,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#cccccc',
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
        flex: 4,
        marginRight: 20,
        height: 50,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondView: {
        flex: 6,
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
        borderColor: '#cccccc',
        borderRadius: 4,
        marginBottom: 12,
    },
    picker: {
        height: 50,
        width: '100%'
    }
});

export default ColorDetails;

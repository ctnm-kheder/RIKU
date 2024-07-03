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

    const local_data  = [
        {label: "Afghanistan",value: "Afghanistan"},
        {label: "Åland Islands",value: "Åland Islands"},
        {label: "Albania",value: "Albania"},
        {label: "Algeria",value: "Algeria"},
        {label: "American Samoa",value: "American Samoa"},
        {label: "Andorra",value: "Andorra"},
        {label: "Angola",value: "Angola"},
        {label: "Anguilla",value: "Anguilla"},
        {label: "Antarctica",value: "Antarctica"},
        {label: "Antigua & Barbuda",value: "Antigua & Barbuda"},
        {label: "Argentina",value: "Argentina"},
        {label: "Armenia",value: "Armenia"},
        {label: "Aruba",value: "Aruba"},
        {label: "Australia",value: "Australia"},
        {label: "Austria",value: "Austria"},
        {label: "Azerbaijan",value: "Azerbaijan"},
        {label: "Bahamas",value: "Bahamas"},
        {label: "Bahrain",value: "Bahrain"},
        {label: "Bangladesh",value: "Bangladesh"},
        {label: "Barbados",value: "Barbados"},
        {label: "Belarus",value: "Belarus"},
        {label: "Belgium",value: "Belgium"},
        {label: "Belize",value: "Belize"},
        {label: "Benin",value: "Benin"},
        {label: "Bermuda",value: "BM"},
        {label: "Bhutan",value: "Bhutan"},
        {label: "Bolivia",value: "Bolivia"},
        {label: "Caribbean Netherlands",value: "Caribbean Netherlands"},
        {label: "Bosnia & Herzegovina",value: "Bosnia & Herzegovina"},
        {label: "Botswana",value: "Botswana"},
        {label: "Bouvet Island",value: "Bouvet Island"},
        {label: "Brazil",value: "Brazil"},
        {label: "British Indian Ocean Territory",value: "British Indian Ocean Territory"},
        {label: "Brunei",value: "Brunei"},
        {label: "Bulgaria",value: "Bulgaria"},
        {label: "Burkina Faso",value: "Burkina Faso"},
        {label: "Burundi",value: "Burundi"},
        {label: "Cambodia",value: "Cambodia"},
        {label: "Cameroon",value: "Cameroon"},
        {label: "Canada",value: "Canada"},
        {label: "Cape Verde",value: "Cape Verde"},
        {label: "Cayman Islands",value: "Cayman Islands"},
        {label: "Central African Republic",value: "Central African Republic"},
        {label: "Chad",value: "Chad"},
        {label: "Chile",value: "Chile"},
        {label: "China",value: "China"},
        {label: "Christmas Island",value: "Christmas Island"},
        {label: "Cocos (Keeling) Islands",value: "Cocos (Keeling) Islands"},
        {label: "Colombia",value: "Colombia"},
        {label: "Comoros",value: "Comoros"},
        {label: "Congo - Brazzaville",value: "Congo - Brazzaville"},
        {label: "Congo - Kinshasa",value: "Congo - Kinshasa"},
        {label: "Cook Islands",value: "Cook Islands"},
        {label: "Costa Rica",value: "Costa Rica"},
        {label: "Côte d’Ivoire",value: "Côte d’Ivoire"},
        {label: "Croatia",value: "Croatia"},
        {label: "Cuba",value: "Cuba"},
        {label: "Curaçao",value: "Curaçao"},
        {label: "Cyprus",value: "Cyprus"},
        {label: "Czechia",value: "Czechia"},
        {label: "Denmark",value: "Denmark"},
        {label: "Djibouti",value: "Djibouti"},
        {label: "Dominica",value: "Dominica"},
        {label: "Dominican Republic",value: "Dominican Republic"},
        {label: "Ecuador",value: "Ecuador"},
        {label: "Egypt",value: "Egypt"},
        {label: "El Salvador",value: "El Salvador"},
        {label: "Equatorial Guinea",value: "Equatorial Guinea"},
        {label: "Eritrea",value: "Eritrea"},
        {label: "Estonia",value: "Estonia"},
        {label: "Ethiopia",value: "Ethiopia"},
        {label: "Falkland Islands (Islas Malvinas)",value: "Falkland Islands (Islas Malvinas)"},
        {label: "Faroe Islands",value: "Faroe Islands"},
        {label: "Fiji",value: "Fiji"},
        {label: "Finland",value: "Finland"},
        {label: "France",value: "France"},
        {label: "French Guiana",value: "French Guiana"},
        {label: "French Polynesia",value: "French Polynesia"},
        {label: "French Southern Territories",value: "French Southern Territories"},
        {label: "Gabon",value: "Gabon"},
        {label: "Gambia",value: "Gambia"},
        {label: "Georgia",value: "Georgia"},
        {label: "Germany",value: "Germany"},
        {label: "Ghana",value: "Ghana"},
        {label: "Gibraltar",value: "Gibraltar"},
        {label: "Greece",value: "Greece"},
        {label: "Greenland",value: "Greenland"},
        {label: "Grenada",value: "Grenada"},
        {label: "Guadeloupe",value: "Guadeloupe"},
        {label: "Guam",value: "Guam"},
        {label: "Guatemala",value: "Guatemala"},
        {label: "Guernsey",value: "Guernsey"},
        {label: "Guinea",value: "Guinea"},
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
           <SelectCountry
    style={styles.dropdown}
    selectedTextStyle={styles.selectedTextStyle}
    placeholderStyle={styles.placeholderStyle}
    maxHeight={300}
    value={formData.country}
    data={local_data}
    valueField="label"
    labelField="label"
    placeholder="Select country"
    searchPlaceholder="Search..."
    onChange={(itemValue) => handleChange('country', itemValue.value)}
/>

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

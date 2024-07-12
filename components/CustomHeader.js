import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomHeader = ({ title1, title2 }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
    <TouchableOpacity
          onPress={() => navigation.navigate('Start')}
          style={styles.container}
        >
          <Image
            source={require('../assets/scan-colour.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor: '#EEEEEE',
  },
  container: {
    width: '100%',
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    height: "100",
    paddingVertical:50,

  },
  header: {
    height: "100",
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default CustomHeader;

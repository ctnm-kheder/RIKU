import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomHeader = ({ title1, title2 }) => {
  return (
    <LinearGradient
    colors={['#ee0051', '#f9ae3e']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.linearGradient}
  >
    <View style={styles.header}>
      <Text style={styles.title}>
        <Text>{title1}</Text>{'\n'}
        <Text>{title2}</Text>

      </Text>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  linearGradient: {
    marginTop: 50,
    paddingBottom:25,
    paddingTop:25,
  },
});

export default CustomHeader;

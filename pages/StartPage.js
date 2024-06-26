import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const screenWidth = Dimensions.get('window').width;

export default function StartPage({navigation}) {
  const animation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4000, 0]
  });

  const buttonY = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0]
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        WELCOME TO{'\n'}THE ERKA{'\n'}COLOUR SCANNER
      </Animated.Text>

      <TouchableOpacity
        style={[styles.button, { transform: [{ translateY: buttonY }] }]}
        onPress={() => navigation.navigate('Overview')}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>

      <Svg height="60%" width={screenWidth} viewBox="0 0 800 800">
        <AnimatedPath
          d="M11.5 26.825958251953125Q300.5 -117.17404174804688 400 415.3259582519531Q423.5 580.8259582519531 788.5 803.8259582519531"
          stroke="hsl(10, 75%, 40%)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={4000}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    lineHeight: 50,
    width: "100%",
    color: "#101835"
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: 'purple',
    marginTop: 30,
    alignSelf: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

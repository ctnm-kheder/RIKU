import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const screenWidth = Dimensions.get('window').width;

export default function StartPage({ navigation }) {
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

      <Animated.View style={{ transform: [{ translateY: buttonY }], zIndex: 2, alignSelf: 'flex-end', marginRight: 40  }}>
        <Svg onPress={() => navigation.navigate('Start')} width="176" height="70" viewBox="0 0 200 75" fill="none">
          <Defs>
            <LinearGradient id="paint0_linear" x1="88" y1="4" x2="88" y2="72" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#D45C7E" />
              <Stop offset="0.0001" stopColor="#D45C7E" />
              <Stop offset="0.06" stopColor="#CE3E8A" />
              <Stop offset="0.125" stopColor="#D14D84" />
            </LinearGradient>
          </Defs>
          <Rect y="4" width="176" height="68" rx="34" fill="url(#paint0_linear)" />
          <G>
            <Path d="M36.4148 34.2216H33.7557C33.6534 33.6534 33.4631 33.1534 33.1847 32.7216C32.9063 32.2898 32.5653 31.9233 32.1619 31.6222C31.7585 31.321 31.3068 31.0937 30.8068 30.9403C30.3125 30.7869 29.7869 30.7102 29.2301 30.7102C28.2244 30.7102 27.3239 30.9631 26.5284 31.4688C25.7386 31.9744 25.1136 32.7159 24.6534 33.6932C24.1989 34.6705 23.9716 35.8636 23.9716 37.2727C23.9716 38.6932 24.1989 39.892 24.6534 40.8693C25.1136 41.8466 25.7415 42.5852 26.5369 43.0852C27.3324 43.5852 28.2273 43.8352 29.2216 43.8352C29.7727 43.8352 30.2955 43.7614 30.7898 43.6136C31.2898 43.4602 31.7415 43.2358 32.1449 42.9403C32.5483 42.6449 32.8892 42.2841 33.1676 41.858C33.4517 41.4261 33.6477 40.9318 33.7557 40.375L36.4148 40.3835C36.2727 41.2415 35.9972 42.0312 35.5881 42.7528C35.1847 43.4688 34.6648 44.0881 34.0284 44.6108C33.3977 45.1278 32.6761 45.5284 31.8636 45.8125C31.0511 46.0966 30.1648 46.2386 29.2045 46.2386C27.6932 46.2386 26.3466 45.8807 25.1648 45.1648C23.983 44.4432 23.0511 43.4119 22.3693 42.071C21.6932 40.7301 21.3551 39.1307 21.3551 37.2727C21.3551 35.4091 21.696 33.8097 22.3778 32.4744C23.0597 31.1335 23.9915 30.1051 25.1733 29.3892C26.3551 28.6676 27.6989 28.3068 29.2045 28.3068C30.1307 28.3068 30.9943 28.4403 31.7955 28.7074C32.6023 28.9687 33.3267 29.3551 33.9688 29.8665C34.6108 30.3722 35.142 30.9915 35.5625 31.7244C35.983 32.4517 36.267 33.2841 36.4148 34.2216ZM55.928 37.2727C55.928 39.1364 55.5871 40.7386 54.9053 42.0795C54.2234 43.4148 53.2888 44.4432 52.1013 45.1648C50.9195 45.8807 49.5757 46.2386 48.07 46.2386C46.5587 46.2386 45.2092 45.8807 44.0217 45.1648C42.8399 44.4432 41.9081 43.4119 41.2263 42.071C40.5445 40.7301 40.2036 39.1307 40.2036 37.2727C40.2036 35.4091 40.5445 33.8097 41.2263 32.4744C41.9081 31.1335 42.8399 30.1051 44.0217 29.3892C45.2092 28.6676 46.5587 28.3068 48.07 28.3068C49.5757 28.3068 50.9195 28.6676 52.1013 29.3892C53.2888 30.1051 54.2234 31.1335 54.9053 32.4744C55.5871 33.8097 55.928 35.4091 55.928 37.2727ZM53.32 37.2727C53.32 35.8523 53.0899 34.6562 52.6297 33.6847C52.1751 32.7074 51.5501 31.9688 50.7547 31.4688C49.9649 30.9631 49.07 30.7102 48.07 30.7102C47.0643 30.7102 46.1666 30.9631 45.3768 31.4688C44.5871 31.9688 43.9621 32.7074 43.5018 33.6847C43.0473 34.6562 42.82 35.8523 42.82 37.2727C42.82 38.6932 43.0473 39.892 43.5018 40.8693C43.9621 41.8409 44.5871 42.5795 45.3768 43.0852C46.1666 43.5852 47.0643 43.8352 48.07 43.8352C49.07 43.8352 49.9649 43.5852 50.7547 43.0852C51.5501 42.5795 52.1751 41.8409 52.6297 40.8693C53.0899 39.892 53.32 38.6932 53.32 37.2727ZM74.4994 28.5455V46H72.079L63.2068 33.1989H63.0449V46H60.4114V28.5455H62.8489L71.7295 41.3636H71.8915V28.5455H74.4994ZM78.6803 30.8125V28.5455H92.1888V30.8125H86.7428V46H84.1178V30.8125H78.6803ZM99.0074 28.5455V46H96.3739V28.5455H99.0074ZM118.131 28.5455V46H115.71L106.838 33.1989H106.676V46H104.043V28.5455H106.48L115.361 41.3636H115.523V28.5455H118.131ZM134.397 28.5455H137.039V40.0256C137.039 41.2472 136.752 42.3295 136.178 43.2727C135.604 44.2102 134.797 44.9489 133.758 45.4886C132.718 46.0227 131.499 46.2898 130.101 46.2898C128.709 46.2898 127.493 46.0227 126.454 45.4886C125.414 44.9489 124.607 44.2102 124.033 43.2727C123.459 42.3295 123.172 41.2472 123.172 40.0256V28.5455H125.806V39.8125C125.806 40.6023 125.979 41.304 126.326 41.9176C126.678 42.5312 127.175 43.0142 127.817 43.3665C128.459 43.7131 129.221 43.8864 130.101 43.8864C130.988 43.8864 131.752 43.7131 132.394 43.3665C133.042 43.0142 133.536 42.5312 133.877 41.9176C134.223 41.304 134.397 40.6023 134.397 39.8125V28.5455ZM142.068 46V28.5455H153.011V30.8125H144.701V36.1307H152.44V38.3892H144.701V43.733H153.113V46H142.068Z" fill="white" />
          </G>
        </Svg>
      </Animated.View>

      <Svg height="100%" width={screenWidth} viewBox="0 0 350 613" style={styles.svgStyle}>
        <Defs>
          <LinearGradient id="paint0_linear" x1="171.693" y1="-0.0792632" x2="171.693" y2="611.4" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#FF4A88" />
            <Stop offset="1" stopColor="#FE8853" />
          </LinearGradient>
          <LinearGradient id="paint1_linear" x1="209.694" y1="23.0084" x2="209.694" y2="589.058" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#BE1D54" />
            <Stop offset="1" stopColor="#F9783E" />
          </LinearGradient>
        </Defs>
        <AnimatedPath
          d="M64 0.0778587C64 0.0778587 173.8 -8.32214 173.2 149.378C172.6 307.078 299.2 348.178 299.2 348.178C299.2 348.178 398.3 434.678 299.2 552.278C200.1 669.878 0 578 0 578V16.9779L64 0.0778587Z"
          fill="url(#paint0_linear)"
        />
        <Path
          d="M100.981 23.01C113.545 22.9164 125.989 24.5089 137.842 27.5065C153.013 31.3472 166.88 38.1855 178.021 47.1784C184.066 52.1432 189.399 57.5765 193.784 63.478C198.999 70.5037 203.266 77.9041 206.466 85.5856C210.378 94.9531 213.104 104.508 214.881 114.25C217.015 126.241 217.963 138.325 217.844 150.409C217.726 184.507 224.956 215.327 239.416 241.931C250.557 262.727 266.913 281.556 287.417 297.387C295.358 303.476 304.01 309.096 313.137 314.061C320.366 317.996 327.833 321.555 335.537 324.74C342.53 327.644 349.879 330.173 357.345 332.047H357.464L357.583 332.141C359.953 333.265 362.323 334.482 364.457 335.794C370.264 339.166 375.598 342.82 380.576 346.848C387.687 352.562 394.087 358.932 399.421 365.77C406.058 374.201 411.036 383.381 414.355 392.936C416.962 400.43 418.385 408.205 418.859 415.981C419.333 424.973 418.622 434.06 416.607 442.959C414.236 453.545 410.681 463.943 405.703 474.06C399.777 486.237 392.547 498.041 384.25 509.282C378.561 517.057 371.924 524.364 364.338 531.202C357.108 537.666 349.167 543.567 340.515 548.907C331.982 554.153 322.974 558.743 313.611 562.771C304.129 566.799 294.292 570.358 284.217 573.262C248.66 583.754 206.111 589 157.754 589C139.975 589 121.367 588.251 102.403 586.845C87.2326 585.721 71.9432 584.129 56.7723 582.068C30.9344 578.696 14.3412 575.23 14.2227 575.136L13.393 574.949L0 571.483V40.9021L0.94818 40.7148L78.699 24.6962C86.0474 23.4784 93.5143 22.9164 100.981 23.01ZM356.753 333.92C349.167 331.953 341.701 329.424 334.589 326.52C326.767 323.335 319.181 319.682 311.833 315.654C302.588 310.595 293.936 304.975 285.876 298.792C265.135 282.867 248.542 263.851 237.282 242.774C230.171 229.565 224.837 215.795 221.4 201.65C219.385 193.594 217.963 185.538 217.015 177.388C215.948 168.676 215.474 159.683 215.593 150.503C215.83 103.946 202.674 69.6606 176.48 48.5836C152.301 29.0053 122.078 24.8836 100.981 24.8836C93.7513 24.8836 86.4029 25.3519 79.2916 26.476L2.37045 42.401L0 571.483C3.6742 572.232 35.2012 577.291 57.602 580.288C72.7728 582.255 88.0623 583.848 103.115 584.972C121.96 586.377 140.449 587.126 158.228 587.126C206.348 587.126 248.66 581.881 283.98 571.483C328.426 558.368 361.612 537.197 382.709 508.345C413.881 465.722 423.955 427.128 412.458 393.498C409.258 384.131 404.28 375.138 397.88 366.801C392.665 360.056 386.384 353.873 379.391 348.253C374.531 344.318 369.198 340.665 363.509 337.386C359.834 335.326 357.345 334.201 356.753 333.92Z"
          fill="url(#paint1_linear)"
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
    backgroundColor:"#222B2F",
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    margin: 20,
    lineHeight: 50,
    letterSpacing:2,
    width: "100%",
    color: "#d04635"
  },
  svgStyle: {
  display:"flex",
  width:"100%",
  justifyContent:"flex-start",
  alignItems:"flex-start",
  width:"100%"
  },
});
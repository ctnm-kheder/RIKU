import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanColor from './pages/ScanColor';
import Camera from './pages/Camera';
import CustomHeader from './components/CustomHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartHeader from './components/StartHeader';
import StartPage from './pages/StartPage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen 
            name="Scan your object"
            component={ScanColor}
            options={{
              header: () => <CustomHeader title1="SCAN YOUR" title2="COLOUR" />
            }} 
          />
          <Stack.Screen
            name="Start"
            component={StartPage}
            options={{
              header: () => <StartHeader />
            }} 
          />

        <Stack.Screen
            name="Camera"
            component={Camera}
            options={{
              header: () => <CustomHeader title1="SCAN YOUR" title2="COLOUR" />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

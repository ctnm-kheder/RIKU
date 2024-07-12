import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanColor from './pages/ScanColor';
import Camera from './pages/Camera';
import CustomHeader from './components/CustomHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeHeader from './components/WelcomeHeader';
import Overview from './pages/Overview';
import ColorDetails from './pages/OrderColor';
import WelcomePage from './pages/Welcome';
import StartHeader from './components/StartHeader'
import Start from './pages/Start'

import logo from './assets/logo.png';

import logoWeis from './assets/logo-weis.png';
import logoOrder from './assets/order-your-colour.png';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Scan your object"
            component={ScanColor}
            options={{
              header: () => <CustomHeader title1="SCAN YOUR" title2="COLOUR" />
            }} 
          />
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{
              header: () => <WelcomeHeader backgroundColor="#EEEEEE" logoSource={logo} />,
            }} 
          />

          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{
              header: () => <WelcomeHeader backgroundColor="#222B2F" logoSource={logoWeis} />,
            }} 
          />
            <Stack.Screen
            name="Start"
            component={Start}
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

        <Stack.Screen
           name="ColorDetails"
           component={ColorDetails}
           options={{
            header: () => <WelcomeHeader backgroundColor="#EEEEEE" logoSource={logoOrder} />,
          }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

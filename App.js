import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import Camera from './pages/Camera';
import CustomHeader from './components/CustomHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home"  
            component={HomeScreen} 
            options={{
              header: () => <CustomHeader title1="SCAN YOUR" title2="COLOUR" />
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

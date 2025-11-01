import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import StudentHomeScreen from './src/screens/StudentHomeScreen';
import SupervisorHomeScreen from './src/screens/SupervisorHomeScreen';
import UploadDocumentScreen from './src/screens/UploadDocumentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
        <Stack.Screen name="SupervisorHome" component={SupervisorHomeScreen} />
        <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


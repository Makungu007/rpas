import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import ProjectUploadScreen from '../screens/ProjectUploadScreen';
import LecturerHomeScreen from '../screens/LecturerHomeScreen';
import LecturerFeedbackScreen from '../screens/LecturerFeedbackScreen';
import StudentFeedbackScreen from '../screens/StudentFeedbackScreen';
import { Platform } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  StudentHome: undefined;
  ProjectUpload: undefined;
  LecturerHome: undefined;
  LecturerFeedback: undefined;
  StudentFeedback: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#0F1C24' },
          headerTintColor: '#E8EEF2',
          headerTitleStyle: { fontWeight: '700' },
          cardStyle: { backgroundColor: '#0B141A' },
          presentation: Platform.OS === 'ios' ? 'card' : 'card',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="StudentHome" component={StudentHomeScreen} options={{ title: 'Student Home' }} />
        <Stack.Screen name="ProjectUpload" component={ProjectUploadScreen} options={{ title: 'Project Upload' }} />
        <Stack.Screen name="LecturerHome" component={LecturerHomeScreen} options={{ title: 'Lecturer Home' }} />
        <Stack.Screen name="LecturerFeedback" component={LecturerFeedbackScreen} options={{ title: 'Lecturer Feedback' }} />
        <Stack.Screen name="StudentFeedback" component={StudentFeedbackScreen} options={{ title: 'Student Feedback' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

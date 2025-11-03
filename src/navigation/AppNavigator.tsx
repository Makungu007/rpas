import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import ProjectUploadScreen from '../screens/ProjectUploadScreen';
import LecturerHomeScreen from '../screens/LecturerHomeScreen';
import LecturerFeedbackScreen from '../screens/LecturerFeedbackScreen';
import StudentFeedbackScreen from '../screens/StudentFeedbackScreen';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { logout } from '../storage/userStore';

export type RootStackParamList = {
  Login: undefined;
  StudentHome: undefined;
  ProjectUpload: undefined;
  LecturerHome: undefined;
  LecturerFeedback: { submissionId: string };
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
        <Stack.Screen
          name="StudentHome"
          component={StudentHomeScreen}
          options={({ navigation }) => ({
            title: 'Student Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  await logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                style={{ paddingHorizontal: 12, paddingVertical: 6 }}
              >
                <Text style={{ color: '#E8EEF2', fontWeight: '700' }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProjectUpload"
          component={ProjectUploadScreen}
          options={({ navigation }) => ({
            title: 'Project Upload',
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  await logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                style={{ paddingHorizontal: 12, paddingVertical: 6 }}
              >
                <Text style={{ color: '#E8EEF2', fontWeight: '700' }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="LecturerHome"
          component={LecturerHomeScreen}
          options={({ navigation }) => ({
            title: 'Lecturer Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  await logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                style={{ paddingHorizontal: 12, paddingVertical: 6 }}
              >
                <Text style={{ color: '#E8EEF2', fontWeight: '700' }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="LecturerFeedback" component={LecturerFeedbackScreen} options={{ title: 'Lecturer Feedback' }} />
        <Stack.Screen name="StudentFeedback" component={StudentFeedbackScreen} options={{ title: 'Student Feedback' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

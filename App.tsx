import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import StudentHomeScreen from './src/screens/StudentHomeScreen';
import LecturerHomeScreen from './src/screens/LecturerHomeScreen';
import LecturerFeedbackScreen from './src/screens/LecturerFeedbackScreen';
import StudentFeedbackScreen from './src/screens/StudentFeedbackScreen';
import ProjectUploadScreen from './src/screens/ProjectUploadScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Swap between screens to preview */}
      {/* <LoginScreen /> */}
      <StudentHomeScreen />
      {/* <LecturerHomeScreen /> */}
      {/* <LecturerFeedbackScreen /> */}
      {/* <StudentFeedbackScreen /> */}
      {/* <ProjectUploadScreen /> */}
    </SafeAreaProvider>
  );
}


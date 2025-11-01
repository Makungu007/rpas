import { registerRootComponent } from 'expo';

import App from './App';
import LoginScreen from './src/screens/LoginScreen';
import StudentHomeScreen from './src/screens/StudentHomeScreen';
import UploadDocumentScreen from './src/screens/UploadDocumentScreen';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(UploadDocumentScreen);

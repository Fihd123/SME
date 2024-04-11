/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().getInitialNotification(async remoteMessage => {
  Alert.alert(
    'A new FCM message arrived! in kill mode...  ',
    JSON.stringify(remoteMessage),
  );
});
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

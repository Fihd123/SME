import React, {useEffect, useRef, useState} from 'react';
import { SafeAreaView, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import SplashScreen from './src/screens/SplashScreen';
import Main from './src/Navigation/Main';
import {NavigationProvider} from './src/Context/NavigationContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  const [message, setMessage] = useState([]);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (Platform.OS === 'ios') {
        // For iOS background notifications
        PushNotificationIOS.addNotificationRequest({
          title: remoteMessage.notification?.title || '',
          body: remoteMessage.notification?.body || '',
          userInfo: remoteMessage.data || {},
          id: '1',
        });
      } else {
        // For Android background notifications
        PushNotification.localNotification({
          title: remoteMessage.notification?.title || '',
          message: remoteMessage.notification?.body || '',
          userInfo: remoteMessage.data || {},
        });
      }
    });

    // Clean up function
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const token = await firebase.messaging().getToken();
      console.log('Token:', token);
    };
    getToken();

    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Background message:', remoteMessage);

        if (Platform.OS === 'ios') {
          // For iOS background notifications
          PushNotificationIOS.addNotificationRequest({
            title: remoteMessage.notification?.title || '',
            body: remoteMessage.notification?.body || '',
            userInfo: remoteMessage.data || {},
            id: '1',
          });
        } else {
          // For Android background notifications
          PushNotification.localNotification({
            title: remoteMessage.notification?.title || '',
            message: remoteMessage.notification?.body || '',
            userInfo: remoteMessage.data || {},
          });
        }
      },
    );

    // Clean up function
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <NavigationProvider>
        <NavigationContainer>
          {splash ? <SplashScreen /> : <Main />}
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaView>
  );
};

export default App;

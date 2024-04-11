import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
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
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await firebase.messaging().getToken();
      console.log('Token:', token);
    };
    getToken();
  }, []);

  const registerForRemoteMessages = () => {
    firebase
      .messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        console.log('Registered');
        requestPremissions();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const requestPremissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        if (status === 1) {
          console.log('Authorized ');
          onMessage();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      showNotification(response.data!.notification);
    });
  };

  const showNotification = (notification: any) => {
    console.log('showing notification ');
    console.log(JSON.stringify(notification));

    // Set notification priority to high
    const priority = Platform.OS === 'android' ? 'high' : undefined;

    // Specify the channel ID if needed
    const channelId = Platform.OS === 'android' ? 'test' : undefined;
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body,
      priority: priority,
      channelId: channelId,
    });
  };

  if (Platform.OS === 'ios') {
    registerForRemoteMessages();
  } else {
    onMessage();
  }

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

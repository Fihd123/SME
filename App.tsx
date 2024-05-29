import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Platform, View, Text, Pressable} from 'react-native';
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
import {useNetInfo} from '@react-native-community/netinfo';
import {TouchableOpacity} from 'react-native-gesture-handler';

const App = () => {
  const [message, setMessage] = useState([]);
  const [splash, setSplash] = useState(true);
  const netInfo = useNetInfo();

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await firebase.messaging().getToken();
      // console.log('Token:', token);
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
    // console.log('showing notification ');
    console.log(JSON.stringify(notification));

    const priority = Platform.OS === 'android' ? 'high' : undefined;

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
          {splash ? (
            <SplashScreen />
          ) : netInfo.isConnected ? (
            <Main />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Oops! Mobile Network is not Available</Text>
              <Pressable style={{marginTop: 10}}>
                <Text>Try Again Later </Text>
              </Pressable>
            </View>
          )}
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaView>
  );
};

export default App;

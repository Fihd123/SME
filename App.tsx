import React, {useEffect, useRef, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/Navigation/Drawer';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle incoming notifications
  const handleNotification = async (remoteMessage: {notification: any}) => {
    const {notification} = remoteMessage;
    if (notification) {
      const {body, title, android} = notification;
      const avatar = android?.imageUrl;

      // Update state with new message
      setMessages(prevMessages => [
        ...prevMessages,
        {
          _id: Math.round(Math.random() * 1000000),
          text: body,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'PartyB',
            avatar: avatar,
          },
        },
      ]);

      // Show an alert to the user
      Alert.alert(title, body);
    }
  };

  useEffect(() => {
    // Subscribe to incoming messages
    const unsubscribe = messaging().onMessage(handleNotification);

    // Clean up subscription when component unmounts
    return unsubscribe;
  }, []);

  // Initialize navigation ref
  const navigationRef = useRef();

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import SplashScreen from '../SplashScreen';
import EventDetails from '../../components/EventCardDetails';
import ConferenceCardDetails from '../../components/ConferenceCardDetails';
import Login from '../Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/Navbar';

const Stack = createNativeStackNavigator();

const NavigationContainerWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('LoginStatus');
      if (loginStatus === 'true' || loginStatus === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error reading login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'MainHome' : 'SplashScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="eventDetails" component={EventDetails} />
        <Stack.Screen name="ConfDetails" component={ConferenceCardDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Navbar" component={Navbar} />
        <Stack.Screen name="MainHome" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;

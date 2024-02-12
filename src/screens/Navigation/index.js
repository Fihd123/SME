import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import SplashScreen from '../SplashScreen';
import Login from '../Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/Navbar';
import EventDetails from '../../components/EventCardDetails';
import ConferenceDetails from '../../components/ConferenceCardDetails';
import NewsDetails from '../../components/NewsDetail';
import News from '../News';
import SignUp from '../SignUp';

const Stack = createNativeStackNavigator();

const NavigationContainerWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('LoginStatus');
      setIsLoggedIn(loginStatus === 'true');
      console.log('Login Status from async storage: ', loginStatus);
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="MainHome" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function MainStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          header: () => <Navbar />,
        }}>
        <Stack.Screen name="MainHomeTabs" component={BottomTabNavigator} />
        <Stack.Screen name="eventDetails" component={EventDetails} />
        <Stack.Screen name="ConferenceDetails" component={ConferenceDetails} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    );
  }
};

export default NavigationContainerWrapper;

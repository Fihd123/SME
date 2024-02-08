import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import BottomTabBar from '../../components/BottomTabNavigator';
import SplashScreen from '../SplashScreen';
import EventDetails from '../../components/EventCardDetails';
import ConferenceCardDetails from '../../components/ConferenceCardDetails';

function index() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTab" component={BottomTabBar} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="eventDetails" component={EventDetails} />
        <Stack.Screen name="ConfDetails" component={ConferenceCardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default index;

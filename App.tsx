import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import EventCardDetails from './src/components/EventCardDetails';
import ConferenceCardDetails from './src/components/ConferenceCardDetails';
import NewsDetails from './src/components/NewsDetail';
import Navbar from './src/components/Navbar';
import News from './src/screens/News';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';

const App = () => {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#EAE9E5',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Navbar"
          component={Navbar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="eventDetails"
          component={EventCardDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfDetails"
          component={ConferenceCardDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

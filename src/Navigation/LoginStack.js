// Main.js
import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import SignUpForm from '../screens/SignUp';
import DrawerNavigator from './Drawer';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import ParentDrawer from './DrawerStack';
import {NavigationContext} from '../Context/NavigationContext';

const LoginStack = () => {
  const Stack = createNativeStackNavigator();
  const {isLoggedIn, setIsLoggedIn} = useContext(NavigationContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Signup" component={SignUpForm} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default LoginStack;

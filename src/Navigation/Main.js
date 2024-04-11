import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContext} from '../Context/NavigationContext';
import Login from '../screens/Login';
import SignUpForm from '../screens/SignUp';
import DrawerNavigator from './Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(NavigationContext);
  const Stack = createNativeStackNavigator();
  console.log(isLoggedIn);
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const storedEmail = await AsyncStorage.getItem('userEmail');
  //       if (storedEmail) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking login status:', error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="drawerHome" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUpForm} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Main;

import React, {useContext, useEffect} from 'react';
import {Text, Image, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../assets/APP-Screen.jpg';
import {useNavigation} from '@react-navigation/native';
import {NavigationContext} from '../Context/NavigationContext';

const SplashScreen = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(NavigationContext);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{
          resizeMode: 'contain',
        }}
        source={AppLogo}
      />
    </View>
  );
};

export default SplashScreen;

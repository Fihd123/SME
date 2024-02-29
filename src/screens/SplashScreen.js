import React, {useEffect} from 'react';
import {Text, Image, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../assets/APP-Screen.jpg';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkLoginAndNavigate = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('LoginStatus');
        if (loginStatus === 'true' || loginStatus === true) {
          setTimeout(() => {
            navigation.navigate('MainHome');
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error reading login status:', error);
      }
    };

    checkLoginAndNavigate();
  }, [navigation]);

  // setTimeout(() => {
  //   navigation.navigate('MainHome');
  // }, 2000);
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

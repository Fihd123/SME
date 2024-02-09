import React, {useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

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
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animatable.Text
        style={{fontSize: 50, fontFamily: 'fantasy', fontWeight: '700'}}
        duration={2000}
        animation="zoomIn">
        Splash
      </Animatable.Text>
    </View>
  );
};

export default SplashScreen;

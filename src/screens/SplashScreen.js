import React, {useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import global from '../components/global';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      if (global.loggedin == true) {
        navigation.navigate('BottomTabNavigator');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animatable.Text
        style={{fontSize: 50, fontFamily: 'fantasy', fontWeight: 700}}
        duration={2000}
        animation="zoomIn">
        Splash{' '}
      </Animatable.Text>
    </View>
  );
};

export default SplashScreen;

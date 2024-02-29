import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import SME from '../assets/SME_LOGO.png';
import profileLogo from '../assets/profile.png';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Navbar = ({navigation}) => {
  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.imagesContainer}>
      <Image source={SME} style={styles.logo} />
      <TouchableOpacity style={styles.profileContainer}>
        <Image source={profileLogo} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

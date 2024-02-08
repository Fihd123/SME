import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import SME from '../assets/SME_LOGO.png';
import {useNavigation} from '@react-navigation/native';
import profileLogo from '../assets/profile.png';

const Navbar = () => {
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.imagesContainer}>
      <Image source={SME} style={styles.logo} />
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={navigateToProfile}>
        <Image source={profileLogo} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../assets/SME_LOGO.png';
import {useNavigation} from '@react-navigation/native';
const DrawerProfile = ({label}) => {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate.navigate('Profile')}>
        <Image style={styles.profileImage} source={logo} />
        <Text style={styles.drawerText}>Lokesh Gajul</Text>
      </TouchableOpacity>
      {/* {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: '#efefef',
              margin: 3,
              borderRadius: 5,
            }}>
            <Text>• Indian SMEs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: '#efefef',
              margin: 3,
              borderRadius: 5,
            }}>
            <Text>• Overseas SMEs</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'column',
    height: 80,
    justifyContent: 'flex-start',
    marginHorizontal: 12,
    borderRadius: 5,
    zIndex: 1,
  },
  profileImage: {
    height: 80,
    width: 80,
  },
  drawerText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 15,
  },
});

export default DrawerProfile;

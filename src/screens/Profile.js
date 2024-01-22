import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Profile = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const navigateToLoginWithClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToSignup}>
        <Text>SignUp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToLoginWithClearStorage}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    width: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});

export default Profile;

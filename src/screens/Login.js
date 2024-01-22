import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    checkLoggedIn();

    logAsyncStorageData();
  }, []);

  const checkLoggedIn = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    if (storedEmail) {
      navigation.navigate('BottomTabNavigator');
      setIsLoggedIn(true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://smeapp.havock.org/api/loginauth',
        {
          email,
          password,
        },
      );

      if (response.data.status) {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userToken', response.data.token);

        navigation.navigate('BottomTabNavigator');
        setMsg(response.data.message);
        setIsLoggedIn(true);
        setTimeout(() => {
          setMsg('');
        }, 1500);

        logAsyncStorageData();
      } else {
        setIsLoggedIn(false);
        setErrorText(response.data.message);
        setTimeout(() => {
          setErrorText('');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorText('Login failed. Please try again.');
    }
  };

  const logAsyncStorageData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userToken = await AsyncStorage.getItem('userToken');

      console.log('User Email:', userEmail);
      console.log('User Token:', userToken);
    } catch (error) {
      console.error('Error retrieving AsyncStorage data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {msg ? (
        <Text style={styles.successText}>{msg}</Text>
      ) : errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;

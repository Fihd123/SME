import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import bgimg from '../assets/login-bg.jpg';
import '../components/global';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    checkLoggedIn();
    logAsyncStorageData();
  }, []);

  const checkLoggedIn = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    if (storedEmail) {
      navigation.navigate('MainHome');
      global.loggedIn = true;
    } else {
      navigation.navigate('Login');
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
        await AsyncStorage.setItem('LoginStatus', JSON.stringify(true));

        navigation.navigate('MainHome');
        setMsg(response.data.message);

        // Update global.loggedIn to true after successful login
        global.loggedIn = true;

        setTimeout(() => {
          setMsg('loggedIn');
        }, 1500);
        console.log(global.loggedIn);
        logAsyncStorageData();
      } else {
        global.loggedIn = false;
        setErrorText(response.data.message);
        setTimeout(() => {
          setErrorText('Error while logging...');
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
      const loginStatus = await AsyncStorage.getItem('LoginStatus');

      console.log('User Email:', userEmail);
      console.log('User Token:', userToken);
      console.log('Login Status:', loginStatus);
    } catch (error) {
      console.error('Error retrieving AsyncStorage data:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Image source={bgimg} style={{width: '100%', height: '50%'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To SME Chamber</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#1F2544',
    borderRadius: 20,
    paddingTop: 13,
    paddingBottom: 13,
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
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
});

export default Login;

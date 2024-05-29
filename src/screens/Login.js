import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import bgimg from '../assets/login-bg.jpg';
import '../components/global';
import {NavigationContext} from '../Context/NavigationContext';
import {useNavigation} from '@react-navigation/native';
const screenWidth = Dimensions.get('screen').width;

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorText, setErrorText] = useState('');
  const [msg, setMsg] = useState('');
  const [disabled, setDisable] = useState(false);
  const [loginDisable, setLoginDisable] = useState(false);
  const [countDown, setCountDown] = useState(15);

  const {isLoggedIn, setIsLoggedIn} = useContext(NavigationContext);

  const getOtp = async () => {
    let timer;

    try {
      const response = await axios.post(
        `https://smeapp.havock.org/api/get-otp`,
        {email: email},
      );

      if (response.data.status) {
        setMsg(response.data.message);

        setTimeout(() => {
          setMsg('');
        }, 2500);

        setDisable(true);
        setCountDown(15);

        timer = setInterval(() => {
          setCountDown(prevCountdown => {
            if (prevCountdown <= 1) {
              clearInterval(timer);
              setDisable(false);
            }
            return prevCountdown - 1;
          });
        }, 1000);
      } else {
        setErrorText(response.data.message);
      }
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email) throw new Error('Please Enter Your Number');
      if (email.length < 6)
        throw new Error('Email must be at least 6 characters long.');

      const response = await axios.post(
        'https://smeapp.havock.org/api/loginauth',
        {
          email: email,
          password: otp,
        },
      );

      if (response.data.status) {
        // Handle successful login
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('LoginStatus', JSON.stringify(isLoggedIn));
        await AsyncStorage.setItem('userId', JSON.stringify(response.data.id));

        setIsLoggedIn(true);
        setEmail('');
        setOtp('');
        setMsg(response.data.message);
        setLoginDisable(true); // Disable the login button
      } else {
        setIsLoggedIn(false);
        setErrorText(response.data.message);
        setTimeout(() => {
          setErrorText('');
        }, 1500);
      }
    } catch (error) {
      setErrorText(error.message);
      setTimeout(() => {
        setErrorText('');
      }, 3000);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Image source={bgimg} style={{width: '100%', height: '50%'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To SME Chamber of India</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Number"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TouchableOpacity
          onPress={getOtp}
          disabled={disabled}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            opacity: disabled ? 0.5 : 1, // Dim button when disabled
          }}>
          <Text
            style={{
              color: '#fff',
              padding: 5,
              backgroundColor: '#1F2544',
              borderRadius: 15,
              width: screenWidth / 4,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
            }}>
            Send OTP
          </Text>
        </TouchableOpacity>
        <Text>{disabled && `Resend OTP in ${countDown} seconds`}</Text>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          secureTextEntry={true}
          onChangeText={text => setOtp(text)}
          value={otp}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loginDisable}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {msg ? (
          <Text style={styles.successText}>{msg}</Text>
        ) : errorText ? (
          <Text style={styles.errorText}>{errorText}</Text>
        ) : null}
      </View>
    </ScrollView>
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
    marginBottom: 12,
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {NavigationContext} from '../Context/NavigationContext';

const SignUpForm = ({route, navigation}) => {
  const {data} = route.params;

  const [fields, setFields] = useState({
    fullName: data.full_name,
    contact: data.contact,
    email: data.email,
    companyName: data.company_name,
    designation: data.designation,
    address: data.address,
    about: data.about,
  });

  const {setIsLoggedIn, email, profileData, setProfileData} =
    useContext(NavigationContext);
  const [error, setError] = useState();

  const handleChange = (name, value) => {
    setFields({...fields, [name]: value});
  };

  const getProfileUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await fetch(
        `https://smeapp.havock.org/api/update-profile`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            id: userId,
            ...fields,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const getUpdatedProfileData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await fetch(
        `https://smeapp.havock.org/api/profile/${userId}?api_token=${userToken}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData && responseData.data) {
        setProfileData(responseData.data); // Update profileData state with updated data
      } else {
        console.log('Error fetching data:', responseData);
      }
    } catch (error) {
      console.log('Error fetching updated profile data:', error);
    }
  };

  useEffect(() => {
    getUpdatedProfileData();
  }, []);

  return (
    <View style={{backgroundColor: '#EAE9E5', flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fields.fullName}
            onChangeText={text => handleChange('fullName', text)}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={fields.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Company Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your company name"
            value={fields.companyName}
            onChangeText={text => handleChange('companyName', text)}
          />

          <Text style={styles.label}>Designation:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your designation"
            value={fields.designation}
            onChangeText={text => handleChange('designation', text)}
          />

          <Text style={styles.label}>Office Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your office address"
            value={fields.address}
            onChangeText={text => handleChange('address', text)}
          />
          <Text style={styles.label}>About Me:</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
              marginBottom: 12,
              backgroundColor: '#fff',
              padding: 40,
              paddingTop: -30,
              marginTop: 10,
            }}
            placeholder="Enter something"
            placeholderTextColor="#A0A0A0"
            value={fields.about}
            multiline={true}
            onChangeText={text => handleChange('about', text)}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={getProfileUpdate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: '#EAE9E5',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    textAlignVertical: 'center',
    marginTop: 10,
    height: 40,
  },
  button: {
    backgroundColor: '#1F2544',
    padding: 10,
    marginTop: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUpForm;

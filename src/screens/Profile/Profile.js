import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import logo from '../../assets/SME_LOGO.png';
import {NavigationContext} from '../../Context/NavigationContext';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, email, profileData, setProfileData} =
    useContext(NavigationContext);

  const navigateToLoginWithClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const getProfileInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userId || !userToken) {
        console.log('User ID or user token is undefined');
        return;
      }

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
        setProfileData(responseData.data);
      } else {
        console.log('Error fetching data:', responseData);
      }
    } catch (error) {
      console.log('Error fetching profile data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileInfo();
      return () => {};
    }, []),
  );

  const navigateToContact = () => {
    navigation.navigate('Signup', {data: profileData});
  };

  return (
    <View style={{flex: 1, marginTop: 30}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.profileImage} source={logo} />
          <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
            {profileData && profileData.contact ? profileData.contact : 'null'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 10,
              marginHorizontal: 5,
            }}
            onPress={navigateToContact}>
            <Text
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                fontWeight: '600',
                color: 'black',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 10,
              marginHorizontal: 5,
            }}
            onPress={navigateToLoginWithClearStorage}>
            <Text
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                fontWeight: '600',
                color: 'black',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.personalInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Name:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.full_name
                ? profileData.full_name
                : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Mobile No:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.contact
                ? profileData.contact
                : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Email:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.email ? profileData.email : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Company Name:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.company_name
                ? profileData.company_name
                : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Designation:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.designation
                ? profileData.designation
                : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Company Address:</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.address
                ? profileData.address
                : 'null'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>About :</Text>
            <Text style={styles.infoText}>
              {profileData && profileData.about ? profileData.about : 'null'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    margin: 10,
    padding: 10,
    width: 100,
    // backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 200,
  },
  personalInfo: {
    marginStart: 15,
    marginTop: 20,
    marginBottom: 30,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  infoRow: {
    // flex: 1,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTextHeading: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    color: 'black',
  },
  infoText: {
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginStart: 15,
    color: 'black',
  },
});

export default Profile;

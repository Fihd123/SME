import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Navbar from '../components/Navbar';
import logo from '../assets/SME_LOGO.png';

const Profile = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const userToken = await AsyncStorage.getItem('userToken');
        setUserEmail(email);
        setUserToken(userToken);
      } catch (error) {
        console.error('Error fetching user email from AsyncStorage:', error);
      }
    };

    fetchUserEmail();
  }, []);

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
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={navigateToLoginWithClearStorage}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginHorizontal: 25,
            marginVertical: 10,
          }}>
          <AntDesign name="logout" size={25} color="black" />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.profileImage} source={logo} />
          <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
            @username{' '}
          </Text>
        </View>

        <View style={styles.personalInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Name:</Text>
            <Text style={styles.infoText}>Brandan Moore</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Movile:</Text>
            <Text style={styles.infoText}>+91 889835323</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Email:</Text>
            <Text style={styles.infoText}>brendan@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>company Name:</Text>
            <Text style={styles.infoText}>Moore IT Services</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Industry:</Text>
            <Text style={styles.infoText}>IT Industry</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Location:</Text>
            <Text style={styles.infoText}>Chennai, India</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Comapny Address:</Text>
            <Text style={styles.infoText}>Perfect Square, Chennai India</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTextHeading}>Member Since:</Text>
            <Text style={styles.infoText}>12/11/2016</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAE9E5',
  },
  button: {
    margin: 10,
    padding: 10,
    width: 100,
    backgroundColor: 'lightblue',
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

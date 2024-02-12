import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  StyleSheet,
} from 'react-native';
import Navbar from '../components/Navbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState(null);
  const navigate = useNavigation();

  const navigateToLogin = () => {
    navigate.navigate('Login');
  };
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', {
      fullName,
      mobileNo,
      email,
      companyName,
      industry,
      password,
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          backgroundColor: '#1F2544',
        }}>
        <AntDesign
          name="arrowleft"
          color="white"
          marginTop={2}
          marginRight={12}
          marginLeft={10}
          size={24}
        />
        <Text style={{color: 'white', fontSize: 19}}>SignUp</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />

        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobileNo}
          onChangeText={text => setMobileNo(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Company Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your company name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
        />

        <Text style={styles.label}>Industry:</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select your industry"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signIn}>
        <Text>
          Already have an account{' '}
          <Text style={styles.signInText} onPress={navigateToLogin}>
            SIGN IN
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#1F2544',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signIn: {
    alignItems: 'center',
  },
  signInText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 13,
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SignUpForm;

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
const EventDropdown = ({label}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDropdown;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
  },
  activeButtonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
});

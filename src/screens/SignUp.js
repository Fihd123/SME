import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SignUp = () => {
  return (
    <View>
      <View style={styles.header}>Signup</View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'blue',
  },
});

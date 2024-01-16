import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Navbar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#1b0083',
    height: 60,
    justifyContent: 'center',
  },
  navbarText: {
    fontSize: 20,
    left: 12,
    color: 'white',
  },
});

export default Navbar;

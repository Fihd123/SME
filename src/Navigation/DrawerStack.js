import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './Drawer';
import {NavigationContainer} from '@react-navigation/native';

const ParentDrawer = () => {
  const parentStack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
    <parentStack.Navigator screenOptions={{headerShown: false}}>
      <parentStack.Screen name="drawerHome" component={DrawerNavigator} />
    </parentStack.Navigator>
  );
};

export default ParentDrawer;

const styles = StyleSheet.create({});

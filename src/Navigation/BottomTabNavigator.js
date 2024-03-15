import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import ContactScreen from '../screens/Contact/DrawerContact';
import About from '../screens/About/About';
import Events from '../screens/Events/Events';
import Gallery from '../screens/Gallery/Gallery';
import Profile from '../screens/Profile/Profile';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#EAE9E5'}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            height: 80,
            padding: 20,
            zIndex: 1,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({color, size}) => (
              <Feather name="info" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="event-note" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={Gallery}
          options={{
            tabBarLabel: 'Gallery',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="contacts" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import ContactScreen from '../screens/Contact';
import Events from '../screens/Events';
import Conference from '../screens/Conference';
import Profile from '../screens/Profile';

function NewsComponent() {
  return (
    <View>
      <Text>News Component 2</Text>
    </View>
  );
}

const News = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="NewsTab"
        component={NewsComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({size}) => <FontAwesome name="home" size={size} />,
        }}
      />

      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({color, size}) => (
            <Feather name="phone-call" size={size} color={color} />
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
        name="Conference"
        component={Conference}
        options={{
          tabBarLabel: 'Conference',
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  tabNavigator: {
    flex: 2,
  },
});

export default News;

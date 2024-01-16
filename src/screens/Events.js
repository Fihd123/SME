import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Navbar from '../components/Navbar';
import styles from '../styles/styles';
import {ENTRIES1, ENTRIES2} from '../assets/json/Entries';

const EventCard = ({item, onPress}) => (
  <TouchableOpacity style={styles.parentCard} onPress={onPress}>
    <View style={[styles.card, style.eventCard]}>
      <Image style={styles.images} source={{uri: item.image}} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

function ForthComingEvents({navigation}) {
  const navigateToDetail = item => {
    navigation.navigate('Details', {item});
  };

  const renderGridItem = ({item}) => (
    <EventCard item={item} onPress={() => navigateToDetail(item)} />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[...ENTRIES1]}
        numColumns={3}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function PastEvents({navigation}) {
  const navigateToDetail = item => {
    navigation.navigate('Details', {item});
  };

  const renderGridItem = ({item}) => (
    <EventCard item={item} onPress={() => navigateToDetail(item)} />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[...ENTRIES2]}
        numColumns={3}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const Events = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <Tab.Navigator
        initialRouteName="ForthComing Events"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'none',
            fontWeight: '600',
          },
          tabBarStyle: {backgroundColor: '#d9cfff', elevation: 0},
          tabBarIndicatorStyle: {backgroundColor: '#1b0083'},
        }}>
        <Tab.Screen
          name="ForthComingEvents"
          component={ForthComingEvents}
          options={{tabBarLabel: 'ForthComing Events'}}
        />
        <Tab.Screen
          name="PastEvents"
          component={PastEvents}
          options={{tabBarLabel: 'Past Events'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Events;

const style = StyleSheet.create({
  eventCard: {
    marginTop: 18,
  },
});

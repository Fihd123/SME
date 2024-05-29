import React, {useEffect, useState} from 'react';
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
import Navbar from '../../components/Navbar';
import {ENTRIES1, ENTRIES2} from '../../assets/json/Entries';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const defaultImage =
  'https://smeapp.havock.org/uploads/event%20image/31/SME_LOGO.png';

const EventCard = ({item, onPress, index}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(item.thumbnail);

  const handleThumbnailError = () => {
    setThumbnailUrl(defaultImage);
  };

  return (
    <TouchableOpacity style={styles.parentCard} onPress={onPress}>
      <View style={[styles.card, styles.eventCard]}>
        <Image
          style={styles.images}
          source={{uri: thumbnailUrl ? thumbnailUrl : item.image}}
          onError={handleThumbnailError}
        />
        <Text style={styles.title}>{item.title.slice(0, 18)}...</Text>
      </View>
    </TouchableOpacity>
  );
};

function ForthComingEvents({navigation}) {
  const [pastEvents, setPastEvents] = useState([]);

  const navigateToDetail = item => {
    navigation.navigate('eventDetails', {id: item.id, item});
  };

  const renderGridItem = ({item}) => (
    <EventCard item={item} onPress={() => navigateToDetail(item)} />
  );

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const response = await fetch(
          'https://smeapp.havock.org/api/upcoming-events',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setPastEvents(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={pastEvents}
        numColumns={2}
        renderItem={renderGridItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const PastEvents = ({navigation}) => {
  const [pastEvents, setPastEvents] = useState([]);

  const fetchPastEvents = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        'https://smeapp.havock.org/api/past-events',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setPastEvents(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPastEvents();
  }, []);

  const navigateToDetail = item => {
    navigation.navigate('eventDetails', {id: item.id, item});
  };

  const renderGridItem = ({item}) => (
    <EventCard item={item} onPress={() => navigateToDetail(item)} />
  );

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={pastEvents}
        numColumns={2}
        renderItem={renderGridItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const Events = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '500',
            textTransform: 'uppercase',
            color: '#000',
          }}>
          Our Events
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#EAE9E5'}}>
        <Tab.Navigator
          initialRouteName="ForthComingEvents"
          screenOptions={{
            tabBarActiveTintColor: '#1F2544',
            tabBarLabelStyle: {
              fontSize: 13,
              letterSpacing: 0.7,
              fontWeight: '500',
              marginLeft: -70,
            },
            tabBarStyle: {
              backgroundColor: '#e8e8e8',
              elevation: 5,
              padding: 0,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#E6D88D',
              height: 3,
              width: 120,
              marginLeft: 15,
            },
          }}>
          <Tab.Screen
            name="ForthComingEvents"
            component={ForthComingEvents}
            options={{
              tabBarLabel: 'ForthComing',
              tabBarLabelStyle: {
                marginLeft: 5,
                fontWeight: '600',
              },
            }}
          />
          <Tab.Screen
            name="PastEvents"
            component={PastEvents}
            options={{tabBarLabel: 'Past'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EAE9E5',
  },
  parentCard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  // images: {
  //   width: '100%',
  //   height: 140,
  //   borderRadius: 10,
  // },
  images: {
    width: 160,
    height: 140,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    padding: 3,
    fontWeight: '700',
  },
});

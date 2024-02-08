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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import ContactScreen from '../screens/Contact';
import Events from '../screens/Events';
import Conference from '../screens/Conference';
import Profile from '../screens/Profile';
import HTML from 'react-native-render-html';
import {ENTRIES1, ENTRIES2} from '../assets/json/Entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import Navbar from '../components/Navbar';

function NewsComponent() {
  const screenWidth = Dimensions.get('window').width;
  const Tab = createMaterialTopTabNavigator();
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
          <Text style={styles.title}>{item.title.slice(0, 30)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function ForthComingEvents({navigation}) {
    const navigateToDetail = item => {
      navigation.navigate('eventDetails', {itemId: item.id, item});
    };

    const renderGridItem = ({item}) => (
      <EventCard item={item} onPress={() => navigateToDetail(item)} />
    );

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={[...ENTRIES1]}
          numColumns={2}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  // function PastEvents({navigation}) {
  //   const [pastEvents, setPastEvents] = useState([]);

  //   const navigateToDetail = item => {
  //     navigation.navigate('eventDetails', {itemId: item.id, item});
  //   };

  //   const renderGridItem = ({item}) => (
  //     <EventCard item={item} onPress={() => navigateToDetail(item)} />
  //   );

  //   useEffect(() => {
  //     const fetchPastEvents = async () => {
  //       try {
  //         const userToken = await AsyncStorage.getItem('userToken');

  //         const response = await fetch(
  //           'https://smeapp.havock.org/api/past-events',
  //           {
  //             method: 'GET',
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${userToken}`,
  //             },
  //           },
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           console.log(response);
  //           console.log('User token', userToken);
  //           setPastEvents(data);
  //           data.forEach(item => {
  //             console.log('Event ID:', item.id);
  //           });
  //         } else {
  //           console.error('Error fetching data:', response.statusText);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchPastEvents();
  //   }, []);

  //   return (
  //     <View style={{flex: 1}}>
  //       <FlatList
  //         data={pastEvents}
  //         numColumns={2}
  //         renderItem={renderGridItem}
  //         keyExtractor={item => item.id.toString()}
  //       />
  //     </View>
  //   );
  // }
  return (
    // <View>
    //   <View>
    //     <Navbar />
    //   </View>
    <Tab.Navigator
      initialRouteName="ForthComing Events"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: 'none',
          fontWeight: '600',
        },
        tabBarStyle: {backgroundColor: '#e8e8e8', elevation: 0},
        tabBarIndicatorStyle: {backgroundColor: 'gray', height: 3},
      }}>
      <Tab.Screen
        name="ForthComingEvents"
        component={ForthComingEvents}
        options={{tabBarLabel: 'ForthComing Events'}}
      />
      {/* <Tab.Screen
        name="PastEvents"
        component={PastEvents}
        options={{tabBarLabel: 'Past Events'}}
      /> */}
    </Tab.Navigator>
  );
}

const News = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
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
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  parentCard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
  },
  images: {
    width: 150,
    height: 140,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    padding: 3,
    fontWeight: '700',
  },
});

export default News;

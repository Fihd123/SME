import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENTRIES1, ENTRIES2, ENTRIES3} from '../assets/json/Entries';
import CarouselComponent from './News/News';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bgimg from '../assets/login-bg.jpg';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const navigateToEventDetail = item => {
    navigation.navigate('eventDetails', {id: item.id});
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const responseEvents = await fetch(
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

        if (responseEvents.ok) {
          const data = await responseEvents.json();
          setUpcomingEvents(data);
        } else {
          console.error(
            'Error fetching events data:',
            responseEvents.statusText,
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPastEvents();
  }, []);

  const fetchRecentVideos = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const responseVideos = await fetch(
        'https://smeapp.havock.org/api/videos',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (responseVideos.ok) {
        const data = await responseVideos.json();
        setVideos(data);
      } else {
        console.error('Error fetching videos data:', responseVideos.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentVideos();
  }, []);

  const EventCard = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => navigateToEventDetail(item)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.thumbnail}} />
        <Text style={styles.title}>{item.title.slice(0, 25)}...</Text>
      </View>
    </TouchableOpacity>
  );

  const VideoCard = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => Linking.openURL(item.video_url)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.new_image}} />
        <Text style={styles.title}>{item.title.slice(0, 20)}...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <ScrollView style={{marginTop: 10}}>
        <View style={{backgroundColor: 'transparent'}}>
          <CarouselComponent />
        </View>

        <View style={styles.header}>
          <Text style={styles.text}>UPCOMING EVENTS</Text>
          <TouchableOpacity
            style={{backgroundColor: '#E6D88D', borderRadius: 20, padding: 7}}
            onPress={() => navigation.navigate('Events')}>
            <AntDesign name="right" color="#000" size={12} />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15}}>
          <FlatList
            horizontal
            data={upcomingEvents}
            renderItem={({item}) => <EventCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.text}>RECENT VIDEOS</Text>
          <TouchableOpacity
            style={{backgroundColor: '#E6D88D', borderRadius: 20, padding: 7}}
            onPress={() => navigation.navigate('Gallery')}>
            <AntDesign name="right" color="#000" size={12} />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15}}>
          <FlatList
            horizontal
            data={videos}
            renderItem={({item}) => <VideoCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{marginTop: 30}}>
          <View style={styles.about_txtcontainer}>
            <Text style={styles.abouttext}>
              SME Chamber of India, a premier national Chamber has been working
              for the development of SMEs from manufacturing, service sectors
              and allied industrial / business sectors for the last 30 years.
              <Text style={{color: '#087E88'}}> .</Text>
              <Text
                onPress={() => navigation.navigate('About')}
                style={{
                  fontWeight: '800',
                  color: '#E6D88D',
                  lineHeight: 19,
                  marginLeft: 10,
                }}>
                Read More ...
              </Text>
            </Text>
          </View>

          <View style={styles.about_imgcontainer}>
            <Image source={bgimg} style={styles.aboutimg}></Image>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

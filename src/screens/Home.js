import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import styles from '../styles/styles';
import {ENTRIES1, ENTRIES2, ENTRIES3} from '../assets/json/Entries';
import CarouselComponent from './News/News';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bgimg from '../assets/login-bg.jpg';
import {useNavigation} from '@react-navigation/native';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';

const Home = () => {
  const navigation = useNavigation();

  const navigateToEventDetail = item => {
    navigation.navigate('eventDetails');
  };

  const renderGridItem1 = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => navigateToEventDetail(item)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title.slice(0, 25)}...</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => handleVideoPress(item.url)}>
      <View style={styles.card}>
        <Image style={styles.images} source={item.image} resizeMode="cover" />

        <Text style={styles.title}>{item.title.slice(0, 20)}...</Text>
      </View>
    </TouchableOpacity>
  );

  const handleVideoPress = url => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const videoItem = [
    {
      id: 1,
      title: 'SME MANUFACTURERS AND EXPORTERS SUMIIT - Session - II',
      image: img4,
      url: 'https://www.youtube.com/watch?v=N3MWn576AP4',
    },
    {
      id: 2,
      title:
        'SME BUISINESS FORUM MEET - How to increase your sales with the help of CRM | 20 March 2024',
      image: img1,
      url: 'https://www.youtube.com/watch?v=EA7xOaeCvxs',
    },
    {
      id: 3,
      title:
        'SME INDUSTRY SUMMIT - Panel Discussion on SME’s Digitization Growth Strategy',
      image: img2,
      url: 'https://www.youtube.com/watch?v=KaFQQmmyHac',
    },
    {
      id: 4,
      title:
        'MARATHI BUSINESS FORUM - Supporting Marathi Entrepreneurs for better business growth',
      image: img3,
      url: 'https://www.youtube.com/watch?v=SrlLcklD5ps',
    },
  ];

  return (
    <View style={styles.safeArea}>
      <ScrollView style={{marginTop: 10}}>
        <View style={{backgroundColor: 'transparent'}}>
          <CarouselComponent />
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>UPCOMING EVENTS</Text>
          <TouchableOpacity
            style={{backgroundColor: '#E6D88D', borderRadius: 20, padding: 8}}
            onPress={() => navigation.navigate('Events')}>
            <AntDesign name="right" color="grey" size={12} />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15}}>
          <FlatList
            horizontal
            data={ENTRIES1}
            renderItem={renderGridItem1}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>RECENT VIDEOS</Text>
          <TouchableOpacity
            style={{backgroundColor: '#E6D88D', borderRadius: 20, padding: 8}}
            onPress={() => navigation.navigate('Gallery')}>
            <AntDesign name="right" color="grey" size={12} />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 10}}>
          <FlatList
            horizontal
            data={videoItem}
            renderItem={renderItem}
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

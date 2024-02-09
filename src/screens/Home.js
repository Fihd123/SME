import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/styles';
import {ENTRIES1, ENTRIES2, ENTRIES3} from '../assets/json/Entries';
import CarouselComponent from '../components/Carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Navbar from '../components/Navbar';
import bgimg from '../assets/login-bg.jpg';

const Home = () => {
  const navigation = useNavigation();

  const navigateToDetail = item => {
    navigation.navigate('eventDetails', {item});
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const renderGridItem = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => navigateToDetail(item)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title.slice(0, 25)}...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <View>
        <Navbar />
      </View>
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
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>UPCOMING CONFERENCE</Text>
          <TouchableOpacity
            style={{backgroundColor: '#E6D88D', borderRadius: 20, padding: 8}}
            onPress={() => navigation.navigate('Conference')}>
            <AntDesign name="right" color="grey" size={12} />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 15}}>
          <FlatList
            horizontal
            data={ENTRIES2}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
          />
        </View>
        <View style={{marginTop: 30}}>
          <View style={styles.about_txtcontainer}>
            <Text style={styles.abouttext}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <Text
                style={{fontWeight: '800', color: '#E6D88D', lineHeight: 20}}>
                {' '}
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

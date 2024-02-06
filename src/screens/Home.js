import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/styles';
import {ENTRIES1, ENTRIES2, ENTRIES3} from '../assets/json/Entries';
import SME from '../assets/SME_LOGO.png';
import profileLogo from '../assets/profile.png';
import CarouselComponent from '../components/Carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = () => {
  const navigation = useNavigation();

  const navigateToDetail = item => {
    navigation.navigate('Details', {item});
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
        <Text style={styles.title}>{item.title.slice(0, 10)}...</Text>
        <Text style={styles.desc}>{item.description.slice(0, 20)}...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.imagesContainer}>
        <Image source={SME} style={styles.logo} />
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={navigateToProfile}>
          <Image source={profileLogo} style={styles.profile} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'transparent'}}>
        <CarouselComponent />
      </View>
      {/* <ScrollView> */}
      <View style={styles.header}>
        <Text style={styles.text}>UPCOMING EVENTS</Text>
        <TouchableOpacity
          style={{backgroundColor: '#AFAFAF', borderRadius: 20, padding: 7}}
          onPress={() => navigation.navigate('Events')}>
          <AntDesign name="right" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={ENTRIES1}
        renderItem={renderGridItem}
        keyExtractor={item => item.key}
      />
      <View style={styles.header}>
        <Text style={styles.text}>UPCOMING CONFERENCE</Text>
        <TouchableOpacity
          style={{backgroundColor: '#AFAFAF', borderRadius: 20, padding: 7}}
          onPress={() => navigation.navigate('Conference')}>
          <AntDesign name="right" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={ENTRIES2}
        renderItem={renderGridItem}
        keyExtractor={item => item.key}
      />
      <View style={styles.header}>
        <Text style={styles.text}>UPCOMING NEWS</Text>
        <TouchableOpacity
          style={{backgroundColor: '#AFAFAF', borderRadius: 20, padding: 7}}
          onPress={() => navigation.navigate('News')}>
          <AntDesign name="right" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={ENTRIES3}
        renderItem={renderGridItem}
        keyExtractor={item => item.key}
      />
      {/* </ScrollView> */}
    </ScrollView>
  );
};

export default Home;

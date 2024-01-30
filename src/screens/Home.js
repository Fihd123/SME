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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel from '../components/Carousel';
import SME from '../assets/SME_LOGO.png';
import profileLogo from '../assets/profile.png';
const Home = () => {
  const navigation = useNavigation();

  const navigateToDetail = item => {
    navigation.navigate('Details', {item});
  };
  const navigateToProfile = item => {
    navigation.navigate('Profile');
  };

  const navigateToEvent = section => {
    navigation.navigate(section);
  };

  const GridItem = React.memo(({item, onPress}) => (
    <TouchableOpacity style={styles.parentCard} onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title.slice(0, 10)}</Text>
        <Text style={styles.desc}>{item.description.slice(0, 20)}...</Text>
      </View>
    </TouchableOpacity>
  ));

  const renderGridItem = ({item}) => (
    <GridItem item={item} onPress={() => navigateToDetail(item)} />
  );

  const renderSectionHeader = ({item}) => (
    <View style={styles.header}>
      <Text style={styles.text}>{item.section}</Text>
      <TouchableOpacity onPress={() => navigateToEvent(item.key)}>
        <Text style={styles.text2}>
          <AntDesign name="right" size={25} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => (
    <>
      {renderSectionHeader({item})}
      <View style={styles.home}>
        <FlatList
          horizontal={true}
          data={item.data}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );

  const data = [
    {section: 'UPCOMING EVENTS', data: ENTRIES1, key: 'Events'},
    {section: 'UPCOMING CONFERENCE', data: ENTRIES2, key: 'Conference'},
    {section: 'UPCOMING NEWS', data: ENTRIES3, key: 'News'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imagesContainer}>
        <Image source={SME} style={styles.logo} />
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={navigateToProfile}>
          <Image source={profileLogo} style={styles.profile} />
        </TouchableOpacity>
      </View>
      <View>
        <Carousel />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Home;

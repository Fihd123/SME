import React, {useState} from 'react';
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
import Navbar from '../components/Navbar';
import styles from '../styles/styles';
import {ENTRIES1, ENTRIES2, ENTRIES3} from '../assets/json/Entries';
import Carousel from '../components/Carousel';

const Home = () => {
  const navigation = useNavigation();
  const navigateToDetail = () => {
    navigation.navigate('Details');
  };

  const navigateToEvent = section => {
    navigation.navigate(section);
  };

  const GridItem = React.memo(({item, onPress}) => (
    <TouchableOpacity style={styles.parentCard} onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  ));

  const renderGridItem = ({item}) => (
    <GridItem item={item} onPress={navigateToDetail} />
  );

  const renderSectionHeader = ({item}) => (
    <View style={styles.header}>
      <Text style={styles.text}>{item.section}</Text>
      <TouchableOpacity onPress={() => navigateToEvent(item.key)}>
        <Text style={styles.text2}>View All</Text>
      </TouchableOpacity>
    </View>
  );

  const data = [
    {section: 'Upcoming Events', data: ENTRIES1, key: 'Events'},
    {section: 'Upcoming Conference', data: ENTRIES2, key: 'Conference'},
    {section: 'Upcoming News', data: ENTRIES3, key: 'News'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar />
      <View style={{padding: 5}}>
        <Carousel />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
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
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

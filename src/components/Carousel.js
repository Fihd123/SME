import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ENTRIES1, ENTRIES2} from '../assets/json/Entries';
import {useNavigation} from '@react-navigation/native';
import * as ProgressBar from 'react-native-progress';

const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = () => {
  const images = Array.isArray(ENTRIES1)
    ? ENTRIES1.map(entry => entry.image)
    : [];

  const navigation = useNavigation();
  const navigateToDetail = item => {
    navigation.navigate('Details', {item});
  };

  const renderGridItem = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => navigateToDetail(item)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title.slice(0, 10)}...</Text>
        <View style={styles.textOverlay}>
          <Text style={styles.desc}>{item.description.slice(0, 30)}...</Text>
          <View style={{paddingBottom: 15, paddingTop: 8}}>
            <ProgressBar.Bar progress={0.3} width={140} height={2} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* <Carousel
        data={images}
        renderItem={renderGridItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth} // Width of the carousel
        layout="default"
        loop
        autoplay
        autoplayInterval={2000}
      /> */}

      <FlatList
        horizontal
        data={ENTRIES2}
        renderItem={renderGridItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    position: 'relative',
    width: 170,
    height: 250,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 160,
    fontSize: 13,
    paddingHorizontal: 15,
    color: '#fff',
    textAlign: 'left',
  },
  desc: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'left',
  },
  images: {
    width: 170,
    height: 250,
    borderRadius: 10,
    opacity: 0.6,
  },
});

export default CarouselComponent;

import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ENTRIES1} from '../assets/json/Entries';

const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = () => {
  const images = Array.isArray(ENTRIES1)
    ? ENTRIES1.map(entry => entry.image)
    : [];

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageHolder}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth} // Width of the carousel
        layout="default"
        loop
        autoplay
        autoplayInterval={2000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageHolder: {
    width: screenWidth - 20,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '96vw',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
});

export default CarouselComponent;

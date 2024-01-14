// Carousel component

import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {ENTRIES1} from '../assets/json/Entries';
import {SliderBox} from 'react-native-image-slider-box';

const Carousel = () => {
  const images = Array.isArray(ENTRIES1)
    ? ENTRIES1.map(entry => entry.image)
    : [];

  const sliderRef = useRef(null);

  return (
    <View style={styles.imageHolder}>
      <SliderBox
        ref={sliderRef}
        images={images}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        autoplayInterval={2000}
        imageLoadingColor="#2196F3"
        resizeMethod="resize"
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageHolder: {
    height: 200,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Carousel;

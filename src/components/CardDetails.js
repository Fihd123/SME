import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const CardDetails = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();

  const navigateToHome = () => {
    const startTime = Date.now();

    // navigation.navigate('Home');
    navigation.goBack();
    const endTime = Date.now();
    console.log('Navigation took', endTime - startTime, 'milliseconds');
  };

  return (
    <View>
      <Text style={styles.cut} onPress={() => navigateToHome()}>
        x
      </Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}> {item.title}</Text>
        <Text style={styles.desc}>desc- {item.description}</Text>
      </View>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  imageContainer: {
    opacity: 0.8, // Set opacity for the image container
  },
  image: {
    width: '100%',
    height: 230,
  },
  container: {
    backgroundColor: '#e7dfdf',
    paddingVertical: 10,
    margin: 15,
    borderRadius: 15,
  },
  title: {
    margin: 15,
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 15,
  },
  desc: {
    paddingHorizontal: 20,
    fontWeight: '400',
    fontSize: 20,
    borderRadius: 15,
  },
  cut: {
    position: 'absolute',
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
    zIndex: 1,
    left: 10,
  },
});

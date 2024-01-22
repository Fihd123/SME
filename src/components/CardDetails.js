import {useNavigation} from '@react-navigation/native';
import React from 'react';
import HTML from 'react-native-render-html';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const CardDetails = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const navigateToHome = () => {
    const startTime = Date.now();
    navigation.goBack();
    const endTime = Date.now();
    console.log('Navigation took', endTime - startTime, 'milliseconds');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cut} onPress={() => navigateToHome()}>
        x
      </Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.thumbnail}} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.descContainer}>
          <HTML source={{html: item.long_desc}} baseStyle={{fontSize: 18}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 230,
  },
  detailsContainer: {
    backgroundColor: '#e7dfdf',
    padding: 15,
    margin: 15,
    borderRadius: 15,
    maxHeight: '80%', // Set a maximum height for the container
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 15,
  },

  desc: {
    fontWeight: '400',
    fontSize: 20,
    borderRadius: 15,
    flexWrap: 'wrap', // Allow the text to wrap to the next line
    width: '80%',
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

export default CardDetails;

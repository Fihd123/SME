import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import HTML from 'react-native-render-html';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardDetails = ({route}) => {
  const [details, setDetails] = useState([]);
  const {itemId} = route.params;
  const navigation = useNavigation();

  const navigateToHome = () => {
    const startTime = Date.now();
    navigation.goBack();
    const endTime = Date.now();
    console.log('Navigation took', endTime - startTime, 'milliseconds');
  };

  const viewSignleEvent = async () => {
    try {
      console.log(itemId);
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `https://smeapp.havock.org/api/view-event/${itemId}?`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
        console.log(data);
      } else {
        console.log('error while details page rendering... ');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewSignleEvent();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.cut} onPress={() => navigateToHome()}>
        x
      </Text>
      {details && details.length > 0 && (
        <>
          {details.map((detail, index) => (
            <View key={index}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: detail.thumbnail}} />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{detail.title}</Text>
                {detail.media && detail.media.length > 0 && (
                  <View>
                    {detail.media.map(mediaItem => (
                      <Text key={mediaItem.id} style={styles.title}>
                        {mediaItem.collection_name}
                      </Text>
                    ))}
                  </View>
                )}
                <View>
                  <HTML
                    source={{html: detail.long_desc}}
                    baseStyle={{fontSize: 18}}
                    contentWidth={Dimensions.get('window').width}
                  />
                  <HTML
                    source={{html: detail.short_desc}}
                    baseStyle={{fontSize: 18}}
                    contentWidth={Dimensions.get('window').width}
                  />
                </View>
              </View>
            </View>
          ))}
        </>
      )}
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
    // backgroundColor: '#e7dfdf',
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

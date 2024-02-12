import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as ProgressBar from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;

const NewsDetailsScreen = ({route}) => {
  const {itemId} = route.params;

  const [singleNews, setSingleNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigation();
  const navigateToBack = () => {
    navigate.goBack();
  };

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(itemId);

        const response = await axios.get(
          `https://smeapp.havock.org/api/view-post/${itemId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        if (response.data) {
          setSingleNews(response.data);
          setLoading(false);
        } else {
          setError('Error fetching data');
          setLoading(true);
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchSingleNews();
  }, [itemId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!singleNews) {
    return (
      <View style={styles.loaderContainer}>
        {/* <ActivityIndicator size="large" /> */}
        <Text>Noe News Details are available... </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text onPress={navigateToBack} style={styles.cut}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Text>
      {singleNews.map((news, index) => (
        <View key={index}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: news.post_image}} />
            <Text style={styles.title}>{news.title}</Text>
          </View>
          <ProgressBar.Bar
            progress={0.3}
            width={screenWidth - 56}
            height={4}
            backgroundColor="#E6D88D"
            color="#2EBFAE"
            borderWidth={0}
            marginHorizontal={28}
            marginTop={10}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 28,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{marginRight: 15, color: 'black'}}>
              Date:{' '}
              <Text style={{fontWeight: '600', color: 'black'}}>
                {news.created_at.slice(0, 9)}
              </Text>
            </Text>
            <Text style={{color: 'black'}}>
              Updated at:{' '}
              <Text style={{fontWeight: '600', color: 'black'}}>
                {news.updated_at.slice(0, 9)}
              </Text>
            </Text>
          </View>
          <View style={{paddingHorizontal: 27, marginTop: 15}}>
            <Text style={{color: 'black'}}>Venue:</Text>
            <Text style={{fontWeight: '600', marginTop: 5, color: 'black'}}>
              {news.description}
            </Text>
            <View style={{marginTop: 10}}>
              <HTML
                source={{html: news.post_article?.article_content}}
                baseStyle={{
                  fontSize: 15,
                  fontWeight: '400',
                  lineHeight: 22,
                  color: 'black',
                }}
                contentWidth={Dimensions.get('window').width}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE9E5',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    paddingHorizontal: 27,
    color: 'black',
  },
  cut: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
    zIndex: 1,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsDetailsScreen;

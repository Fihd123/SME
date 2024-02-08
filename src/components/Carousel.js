import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ProgressBar from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(
          'https://smeapp.havock.org/api/all-posts',
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
          setNews(data);
          setLoading(false);
        } else {
          setError('Error fetching data');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const navigateToDetail = item => {
    navigation.navigate('eventDetails', {itemId: item.id, item});
  };

  const renderGridItem = ({item}) => (
    <TouchableOpacity
      style={styles.parentCard}
      onPress={() => navigateToDetail(item)}>
      <View style={styles.card}>
        <Image style={styles.images} source={{uri: item.post_image}} />
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{paddingBottom: 12, paddingTop: 8}}>
            <ProgressBar.Bar
              progress={0.4}
              width={screenWidth / 2.9}
              height={4}
              backgroundColor="#E6D88D"
              color="#2EBFAE"
              borderWidth={0}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{paddingLeft: 5}}>
      <FlatList
        horizontal
        data={news}
        renderItem={renderGridItem}
        keyExtractor={item => item.id.toString()}
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
    width: screenWidth / 2,
    height: 250,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    lineHeight: 17,
    textAlign: 'left',
    marginBottom: 3,
    paddingRight: 15,
  },
  desc: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'left',
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    opacity: 0.6,
  },
});

export default CarouselComponent;

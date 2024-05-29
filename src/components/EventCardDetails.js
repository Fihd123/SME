import React, {useState, useEffect} from 'react';
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
import * as ProgressBar from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index({props, route}) {
  const {width: screenWidth} = Dimensions.get('window');
  const {id} = route.params;
  const navigate = useNavigation();
  const [eventDetail, setEventDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(
          `https://smeapp.havock.org/api/view-event/${id}?api_token=${userToken}`,
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
          const encodedData = data.map(item => ({
            ...item,
            thumbnail: item.thumbnail
              ? encodeURIComponent(item.thumbnail)
              : null,
          }));
          setEventDetails(data);
          setLoading(false);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text onPress={() => navigate.goBack()} style={styles.cut}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Text>

      {eventDetail.map((item, index) => (
        <View key={index}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  item.thumbnail ||
                  'https://smeapp.havock.org/front_web/images/default.jpg',
              }}
            />

            <Text style={styles.title}>{item.title}</Text>
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
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <Text style={{marginRight: 15, color: 'black'}}>
              Date:{' '}
              <Text style={{fontWeight: '600', color: 'black'}}>
                {item.date}
              </Text>
            </Text>
            <Text style={{color: 'black'}}>
              Updated at:{' '}
              <Text style={{fontWeight: '600', color: 'black'}}>
                {item.updated_at.slice(0, 9)}
              </Text>
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 27,
              marginTop: 15,
            }}>
            <Text style={{color: 'black'}}>Venue:</Text>

            <Text style={{fontWeight: '600', marginTop: 5, color: 'black'}}>
              {item.short_desc}
            </Text>
            <View style={{marginTop: 20}}>
              <HTML
                source={{html: item.long_desc}}
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
}

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
  detailsContainer: {
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    maxHeight: '80%',
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    paddingHorizontal: 27,
    color: 'black',
  },

  desc: {
    fontWeight: '400',
    fontSize: 14,
    borderRadius: 15,
    flexWrap: 'wrap',
    width: '80%',
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
});

export default Index;

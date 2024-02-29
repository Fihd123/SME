import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import HTML from 'react-native-render-html';

const AboutDetailsPage = ({route}) => {
  const [data, setData] = useState();
  const {itemId} = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await axios.get(
          `https://smeapp.havock.org/api/page/${itemId}?api_token=${userToken}`,
        );

        console.log('API response:', response.data);

        if (response.data) {
          setData(response.data);
        } else {
          console.log('Error: Empty response from the API');
        }
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    };

    fetchDetails();
  }, [itemId]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#EAE9E5'}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          margin: 8,
        }}>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 30,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: '#000',
            }}>
            {data?.title}
          </Text>
          <HTML
            source={{html: data?.content}}
            baseStyle={{
              fontWeight: '600',
              lineHeight: 22,
              color: 'black',
            }}
            contentWidth={Dimensions.get('window').width}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutDetailsPage;

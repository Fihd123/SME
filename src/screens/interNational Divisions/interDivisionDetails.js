import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import {NavigationContext} from '../../Context/NavigationContext';

const InterDivisionDetails = ({route}) => {
  const [data, setData] = useState();
  const {itemId} = route.params;
  const {loading, setLoading} = useContext(NavigationContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await axios.get(
          `https://smeapp.havock.org/api/page/${itemId}?api_token=${userToken}`,
        );

        if (response.data) {
          setData(response.data);
        } else {
          console.log('Error: Empty response from the API');
        }
      } catch (error) {
        console.log('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [itemId]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
              lineHeight: 20,
              color: 'black',
            }}
            contentWidth={Dimensions.get('window').width}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InterDivisionDetails;

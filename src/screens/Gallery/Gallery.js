import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ENTRIES1, ENTRIES2} from '../../assets/json/Entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img2 from '../../assets/img2.png';
import img1 from '../../assets/img1.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';

const defaultImage =
  'https://smeapp.havock.org/uploads/event%20image/31/SME_LOGO.png';

const EventCard = ({item, onPress, index}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(item.thumbnail);

  const handleThumbnailError = () => {
    setThumbnailUrl(defaultImage);
  };

  return (
    <TouchableOpacity style={styles.parentCard} onPress={onPress}>
      <View style={[styles.card, styles.eventCard]}>
        <Image
          key={index}
          style={styles.images}
          source={{uri: item.new_image || defaultImage}}
          onError={handleThumbnailError}
        />

        <Text style={styles.title}>{item.title.slice(0, 18)}...</Text>
      </View>
    </TouchableOpacity>
  );
};

function Photos({navigation}) {
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Change to null

  const handleSelected = item => {
    setModalVisible(true);
    setSelectedImage(item.new_image);
  };

  const renderGridItem = ({item}) => (
    <EventCard item={item} onPress={() => handleSelected(item)} />
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const response = await fetch('https://smeapp.havock.org/api/albums', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={photos}
        numColumns={2}
        renderItem={renderGridItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
}

function Videos({navigation}) {
  const [videos, setVideos] = useState([]);

  const handleVideoPress = video_url => {
    if (video_url) {
      Linking.openURL(video_url);
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.parentCard}
        onPress={() => handleVideoPress(item.video_url)}>
        <View style={styles.card}>
          <Image
            style={styles.images}
            source={{uri: item.new_image || defaultImage}}
          />

          <Text style={styles.title}>{item.title.slice(0, 20)}...</Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        const response = await fetch('https://smeapp.havock.org/api/videos', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={videos}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const Gallery = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '500',
            textTransform: 'uppercase',
            color: '#000',
            backgroundColor: '#EAE9E5',
          }}>
          Our Gallery
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="ForthComingEvents"
          screenOptions={{
            tabBarActiveTintColor: '#1F2544',
            tabBarLabelStyle: {
              fontSize: 13,
              letterSpacing: 0.7,
              fontWeight: '500',
              marginLeft: -70,
            },
            tabBarStyle: {
              backgroundColor: '#e8e8e8',
              elevation: 5,
              padding: 0,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#E6D88D',
              height: 3,
              width: 120,
              marginLeft: 15,
            },
          }}>
          <Tab.Screen
            name="Photos"
            component={Photos}
            options={{tabBarLabel: 'Photos'}}
          />
          <Tab.Screen
            name="Videos"
            component={Videos}
            options={{tabBarLabel: 'Videos'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EAE9E5',
  },
  parentCard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width: '50%',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  // images: {
  //   width: '100%',
  //   height: 140,
  //   borderRadius: 10,
  // },
  images: {
    width: 160,
    height: 140,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    padding: 4,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 190,
    right: 25,
    zIndex: 1, // Ensure button is above the modal content
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalImage: {
    width: Dimensions.get('window').width - 50,
    resizeMode: 'contain',
    height: 400,
  },
});

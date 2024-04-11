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

const ConfCard = ({item, onPress, index}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(item.thumbnail);

  const handleThumbnailError = () => {
    setThumbnailUrl(defaultImage);
  };

  return (
    <TouchableOpacity style={styles.parentCard}>
      <View style={[styles.card, styles.eventCard]}>
        <Image
          style={styles.images}
          source={{uri: thumbnailUrl ? thumbnailUrl : item.image}}
          onError={handleThumbnailError}
        />
        <Text style={styles.title}>{item.title.slice(0, 30)}</Text>
      </View>
    </TouchableOpacity>
  );
};

function ForthComingConferences({navigation}) {
  const navigateToDetail = item => {
    navigation.navigate('galleryDetails', {item});
  };

  const renderGridItem = ({item}) => <ConfCard item={item} />;

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={[...ENTRIES1]}
        numColumns={2}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function PastConferences({navigation}) {
  const [pastConf, setPastconf] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleVideoPress = url => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const videoItem = [
    {
      id: 1,
      title: 'SME MANUFACTURERS AND EXPORTERS SUMIIT - Session - II',
      image: img4,
      url: 'https://www.youtube.com/watch?v=N3MWn576AP4',
    },
    {
      id: 2,
      title:
        'SME BUISINESS FORUM MEET - How to increase your sales with the help of CRM | 20 March 2024',
      image: img1,
      url: 'https://www.youtube.com/watch?v=EA7xOaeCvxs',
    },
    {
      id: 3,
      title:
        'SME INDUSTRY SUMMIT - Panel Discussion on SME’s Digitization Growth Strategy',
      image: img2,
      url: 'https://www.youtube.com/watch?v=KaFQQmmyHac',
    },
    {
      id: 4,
      title:
        'MARATHI BUSINESS FORUM - Supporting Marathi Entrepreneurs for better business growth',
      image: img3,
      url: 'https://www.youtube.com/watch?v=SrlLcklD5ps',
    },
  ];

  const openImageModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.parentCard}
        onPress={() => handleVideoPress(item.url)}>
        <View style={styles.card}>
          <Image style={styles.images} source={item.image} resizeMode="cover" />

          <Text style={styles.title}>{item.title.slice(0, 20)}...</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchPastConf = async () => {
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

          // Log the gallery images for each item in the data
          // data.forEach(item => {
          //   console.log('Gallery images:', item.gallery_image);
          // });

          setPastconf(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPastConf();
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 10, backgroundColor: '#EAE9E5'}}>
      <FlatList
        data={videoItem}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        </View>
      </Modal>
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
            component={ForthComingConferences}
            options={{tabBarLabel: 'Photos'}}
          />
          <Tab.Screen
            name="Videos"
            component={PastConferences}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
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
    width: Dimensions.get('window').width - 40, // Take full width minus some padding
    height: Dimensions.get('window').height - 80, // Take full height minus some padding
    resizeMode: 'contain', // Ensure the image fits inside the modal
  },
});

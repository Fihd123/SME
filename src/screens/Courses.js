import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Courses = () => {
  const cardData = [
    {
      id: 1,
      images: require('../assets/ds.jpeg'),
      title: 'Artificial Intelligence',
    },
    {
      id: 2,
      images: require('../assets/AI.jpeg'),
      title: 'Artificial Intelligence',
    },
    {
      id: 3,
      images: require('../assets/Blockchain.jpeg'),
      title: 'Blockchain',
    },
    {
      id: 3,
      images: require('../assets/cyberSecurity.jpeg'),
      title: 'Blockchain',
    },
  ];
  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {cardData.map((card, index) => (
          <TouchableOpacity key={index} onPress={navigateToDetail}>
            <View style={styles.card}>
              <Image source={card.images} />
              <Text style={styles.text}>{card.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 28,
  },
  images: {
    width: '100%',
    objectFit: 'contain',
    margin: 34,
  },
  text: {
    padding: 15,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Courses;

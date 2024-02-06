import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const Contact = () => {
  const ENTRIES1 = [
    {
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      image: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      image: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
      image: 'https://i.imgur.com/lceHsT6l.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[0].image}} />
        </View>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[1].image}} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[2].image}} />
        </View>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[3].image}} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[4].image}} />
        </View>
        <View style={styles.column}>
          <Image style={styles.image} source={{uri: ENTRIES1[5].image}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Default flexDirection is 'column', so this line is optional
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
  },
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    borderRadius: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 25,
  },
});

export default Contact;

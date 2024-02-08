import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import Navbar from '../components/Navbar';
import aboutBg from '../assets/aboutbg.png';

const About = () => {
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
    <ScrollView>
      <View>
        <Navbar />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              paddingBottom: 8,
              color: 'black',
            }}>
            ABOUT SME CHAMBER OF INDIA
          </Text>
          <Text style={styles.about_txt}>
            SME Chamber of India, a premier national Chamber has been working
            for the development of SMEs from manufacturing, service sectors and
            allied industrial / business sectors for the last 30 years. The
            Chamber integrates SMEs, large corporates, MNCs, banks, investors,
            policy makers, Young & Women entrepreneurs and Start–Ups to
            establish and enhance contacts for better business growth and
            expansion.
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              paddingBottom: 8,
              color: 'black',
            }}>
            SME SECTOR IN INDIA
          </Text>
          <Text style={styles.about_txt}>
            Small and Medium Enterprise (MSME) sector has emerged as a very
            important sector of the Indian economy, contributing significantly
            to employment generation, innovation, exports, and inclusive growth
            of the economy. Micro, Small and Medium Enterprises (MSME) are the
            backbone of the socio-economic development of our country.
          </Text>
        </View>
        <View style={styles.row1}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              paddingBottom: 8,
              textAlign: 'center',
              color: 'black',
            }}>
            FOUNDER
          </Text>
          <Image
            source={aboutBg}
            style={{width: '100%', height: 220, borderRadius: 200}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              paddingBottom: 8,
              color: 'black',
            }}>
            Mr. Chandrakant Salunkhe
          </Text>
          <Text style={styles.about_txt}>
            Mr. Chandrakant Salunkhe has founded SME Chamber of India in 1993 to
            integrate SMEs to provide unique platform to enhance business
            contacts and business growth. The Chamber has been providing value
            addition & business advisory services for business transformation,
            diversification & expansion as well as identifying business
            partners, channelising finance and investment, international
            collaborations, export promotion, improving excellence in
            manufacturing, quality productivity, preparing them for contract
            manufacturing, joint ventures, technology transfers, private equity
            & external commercial borrowings for further business growth,
            support for supply and procurement, improve creditworthiness and
            credibility to attract strategic partners & investors, encouraging
            them to enter into capital market, to take up issues and grievances
            with the appropriate authorities.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  row: {
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  row1: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  about_txt: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    color: 'black',
  },
});

export default About;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import img from '../assets/login-bg.jpg';
import * as ProgressBar from 'react-native-progress';

function Index(props) {
  const {width: screenWidth} = Dimensions.get('window');
  const long_desc =
    "<p style='text-align:justify'><strong><span>SME Business Forum, a premium business networking platform would like to provide opportunities to connect and communicate with the entrepreneurs, senior executives, buyers, suppliers, manufacturers, exporters, service providers and representatives from the various business fields to explore various emerging business opportunities related to supply, procurement, sourcing,  marketing, branding, promotion and establish strategic business partnership with the potential enterprises to receive &amp; exchange business leads &amp; referrals as well as connect with the investors, bankers and financial consultants to fulfil your financial &amp; investment requirements.</span></strong></p>";
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.cut}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Text>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={img} />
          <Text style={styles.title}>
            SME BUSINESS FORUM Focus on : Connect | Communicate | Brand | Source
          </Text>
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
            <Text style={{fontWeight: '600', color: 'black'}}>20-07-2023</Text>
          </Text>
          <Text style={{color: 'black'}}>
            Updated at:{' '}
            <Text style={{fontWeight: '600', color: 'black'}}>23-06-2023</Text>
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 27,
            marginTop: 15,
          }}>
          <Text style={{color: 'black'}}>Venue:</Text>

          <Text style={{fontWeight: '600', marginTop: 5, color: 'black'}}>
            SME Samvad Conference Hall, MIDC, Andheri East, Mumbai
          </Text>
          <View style={{marginTop: 20}}>
            <HTML
              source={{html: long_desc}}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

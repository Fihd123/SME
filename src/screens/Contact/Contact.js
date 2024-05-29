import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../../components/Navbar';
import HTML from 'react-native-render-html';

const Contact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            paddingBottom: 8,
            color: 'black',
          }}>
          Contact Details :
        </Text>
        <View>
          <Text style={styles.title}>Contact No :</Text>
          <Text style={styles.details}>
            Office No. 1, 3rd Floor, Samruddhi Venture Park, SEEPZ - MIDC
            Central Road, Next to Akruti Centre, Andheri (E), Mumbai - 400 093.
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Email :</Text>
          <Text style={styles.details}>
            secretariat@smechamber.com director@mechamber.com
            registration@smechamber.in
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Whatsapp :</Text>
          <Text style={styles.details}>+91 - 8976702147</Text>
        </View>

        <View>
          <Text style={styles.title}>Mobile :</Text>
          <Text style={styles.details}>+91 - 7506046755 / 9930912755</Text>
        </View>

        <View>
          <Text style={styles.title}>Tel :</Text>
          <Text style={styles.details}>
            + 91 – 22 – 6951 1111 | Fax : + 91 – 22 – 2825 0414
          </Text>
        </View>

        <View>
          <Text style={styles.title}>Website :</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.smechamberofindia.com');
            }}>
            <Text style={{color: 'blue'}}>
              Website: www.smechamberofindia.com
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#EAE9E5',
  },
  row: {
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
    fontSize: 15,
  },
  details: {
    fontWeight: '500',
    color: '#000',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5,
  },
});

export default Contact;

import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE9E5',
  },

  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: '#EAE9E5',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 25,
  },
  header: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 20,
  },
  home: {
    marginHorizontal: 3,
  },
  parentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    // marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // eventCard: {
  //   marginTop: 15,
  // },
  card: {
    width: screenWidth / 3,
    alignItems: 'left',
    borderRadius: 10,
  },

  title: {
    fontSize: 14,
    color: '#363636',
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'left',
    letterSpacing: -0.5,
    marginBottom: 3,
    paddingLeft: 5,
    paddingRight: 10,
    marginTop: 7,
  },
  desc: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#1F2544',
    fontWeight: '600',
    textAlign: 'center',
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    backgroundColor: '#dedbd4',
    padding: 5,
    borderRadius: 20,
    textAlign: 'center',
  },

  images: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  about_txtcontainer: {
    backgroundColor: '#087E88',
    paddingHorizontal: 20,
    minHeight: 200,
    borderTopLeftRadius: 30,
  },
  abouttext: {
    fontSize: 13,
    lineHeight: 18,
    color: '#000',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  about_imgcontainer: {
    paddingHorizontal: 20,
    marginTop: -70,
    marginBottom: 20,
  },
  aboutimg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default styles;

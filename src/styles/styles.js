import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  header: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  home: {
    marginHorizontal: 3,
  },
  parentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  card: {
    width: 110,
    alignItems: 'left',
    // backgroundColor: '#dcdcdc',
    margin: 5,
    borderRadius: 10,
  },

  title: {
    fontSize: 13,
    padding: 3,
    textAlign: 'left',
  },
  desc: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default styles;

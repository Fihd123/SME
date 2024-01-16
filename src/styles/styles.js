import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  card: {
    width: 110,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    margin: 5,
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 10,
  },

  title: {
    fontSize: 13,
    textAlign: 'center',
  },

  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },

  images: {
    width: 95,
    height: 100,
    borderRadius: 10,
  },
});

export default styles;

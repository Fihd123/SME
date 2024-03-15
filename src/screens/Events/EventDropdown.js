import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const EventDropdown = ({label, items}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={[isOpen ? styles.activeButtonText : styles.buttonText]}>
          {label}
        </Text>
        <View
          style={{backgroundColor: '#E6D88D', padding: 8, borderRadius: 20}}>
          <AntDesign name={isOpen ? 'down' : 'right'} color="grey" size={12} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {items.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  console.log('Events From dropwon');
                  navigation.navigate('Events');
                }}
                style={{
                  textAlign: 'center',
                  padding: 10,
                  backgroundColor: '#efefef',
                  margin: 3,
                  borderRadius: 5,
                }}>
                <Text>• {item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default EventDropdown;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dropdown: {
    position: 'relative',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
  },
  activeButtonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
});

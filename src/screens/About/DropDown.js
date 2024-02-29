import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropdown = ({label, items, active, setActive}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigation = useNavigation();

  const handleLabelClick = () => {
    toggleDropdown();
    setActive(label);
  };

  const handleNavigation = itemId => {
    if (itemId === 1) {
      navigation.navigate('About');
    } else {
      navigation.navigate('AboutDetails', {itemId: itemId});
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text
          style={[styles.buttonText, isOpen && styles.activeButtonText]}
          onPress={handleLabelClick}>
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
                onPress={() => handleNavigation(item.id)}
                style={{
                  textAlign: 'center',
                  padding: 10,
                  backgroundColor: '#efefef',
                  margin: 4,
                  borderRadius: 5,
                }}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
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

export default CustomDropdown;

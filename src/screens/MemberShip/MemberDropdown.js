import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const MemberDropdown = ({label, items, items1}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={[styles.buttonText, isOpen && styles.activeButtonText]}>
          {label}
        </Text>
        <View
          style={{backgroundColor: '#E6D88D', padding: 8, borderRadius: 20}}>
          <AntDesign name={isOpen ? 'down' : 'right'} color="grey" size={12} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: '#efefef',
              margin: 3,
              borderRadius: 6,
            }}>
            <Text>
              • Membership For Indian Companies
              {isOpen && (
                <TouchableOpacity
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    backgroundColor: '#efefef',
                    margin: 3,
                  }}>
                  {items.map(item => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.childList}
                        onPress={() =>
                          navigation.navigate('MemberDetailsPage', {
                            itemId: item.id,
                          })
                        }>
                        <Text style={{color: '#626262'}}>{item.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </TouchableOpacity>
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: '#efefef',
              margin: 3,
              borderRadius: 6,
            }}>
            <Text>
              • Membership For Overseas Companies
              {isOpen && (
                <TouchableOpacity
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    backgroundColor: '#efefef',
                    margin: 3,
                  }}>
                  {items1.map(item => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.childList}
                        onPress={() =>
                          navigation.navigate('MemberDetailsPage', {
                            itemId: item.id,
                          })
                        }>
                        <Text style={{color: '#626262'}}>{item.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </TouchableOpacity>
              )}
            </Text>
          </TouchableOpacity>
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
  childList: {
    marginTop: 8,
    padding: 8,
    marginBottom: 2,
    backgroundColor: '#f8f8f8',
    color: '#000',
    borderRadius: 4,
  },
});

export default MemberDropdown;

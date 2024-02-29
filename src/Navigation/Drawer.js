import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/Profile/Profile';
import EventDetails from '../components/EventCardDetails';
import ConferenceDetails from '../components/ConferenceCardDetails';
import Login from '../screens/Login';
import About from '../screens/About/About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsDetailsScreen from '../components/NewsDetail';
import CustomDropdown from '../screens/About/DropDown';
import SignUpForm from '../screens/SignUp';
import Team from '../screens/Team/Team';
import TeamDropdown from '../screens/Team/TeamDropdown';
import Support from '../screens/Support/SupportDropDown';
import Member from '../screens/MemberShip/MemberShip';
import SupportDropdown from '../screens/Support/SupportDropDown';
import MemberDropdown from '../screens/MemberShip/MemberDropdown';
import AboutDetailsPage from '../screens/About/AboutDetailsPage';
import SplashScreen from '../screens/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import DrawerProfile from '../screens/Profile/DrawerProfile';
import TeamDetailsPage from '../screens/Team/TeamDetailsPage';
import SupportDetailsPage from '../screens/Support/SupportDetailsPage';
import MemberDetailsPage from '../screens/MemberShip/MemberDetailsPage';

const Drawer = createDrawerNavigator();

const AboutItems = [
  {id: 1, label: 'Introduction', navigation: '1'},
  {id: 3, label: 'Objectives'},
  {id: 4, label: 'Activities'},
  {id: 5, label: 'Action Plan'},
  {id: 6, label: 'SMEs in India'},
  {id: 7, label: 'Scope in India SMEs'},
  {id: 8, label: 'challenges in India SMEs'},
];

const TeamItems = [
  {
    id: 9,
    label: 'Founder & President',
  },
  {
    id: 10,
    label: 'National Advisory Board',
  },
  {
    id: 11,
    label: 'Members of National Advisory Board',
  },
  {
    id: 12,
    label: 'Members of International Advisory Board',
  },
];

const SupportItems = [
  {
    id: 13,
    label: 'Indian SMEs',
  },
  {
    id: 14,
    label: 'Overseas SMEs',
  },
];
const MemberItems1 = [
  {
    id: 15,
    label: 'Membership Advantages',
  },
  {
    id: 17,
    label: 'Membership Categories',
  },
  {
    id: 18,
    label: 'Apply for Membership',
  },
];
const MemberItems2 = [
  {
    id: 16,
    label: 'Membership Advantages',
  },
  {
    id: 17,
    label: 'Membership Categories',
  },
  {
    id: 18,
    label: 'Apply for Membership',
  },
];

const CustomDrawerContent = props => {
  const [active, setActive] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      {Object.entries(props.descriptors).map(([key, descriptor], index) => {
        const focused = index === props.state.index;
        return (
          <View key={key} style={{flex: 1}}>
            {descriptor.options.display && (
              <DrawerItem
                key={key}
                label={() => (
                  <Text
                    style={
                      focused ? styles.drawerLabelFocused : styles.drawerLabel
                    }>
                    {descriptor.options.title}
                  </Text>
                )}
                onPress={() => {
                  console.log('Navigating to:', descriptor.route.name);
                  descriptor.navigation.navigate(descriptor.route.name);
                }}
                style={[
                  styles.drawerItem,
                  focused ? styles.drawerItemFocused : null,
                ]}
              />
            )}
            {descriptor.route.name === 'About' && (
              <CustomDropdown
                label="About "
                items={AboutItems}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'Team' && (
              <TeamDropdown
                label="Team"
                active={active}
                setActive={setActive}
                items={TeamItems}
              />
            )}
            {descriptor.route.name === 'Support' && (
              <SupportDropdown
                label="Support"
                active={active}
                setActive={setActive}
                items={SupportItems}
              />
            )}
            {descriptor.route.name === 'Member' && (
              <MemberDropdown
                label="Member"
                active={active}
                setActive={setActive}
                items={MemberItems1}
                items1={MemberItems2}
              />
            )}
            {descriptor.route.name === 'Profile' && (
              <DrawerProfile
                label="Profile"
                active={active}
                setActive={setActive}
              />
            )}
          </View>
        );
      })}
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('LoginStatus');
      if (loginStatus) {
        console.log('Navigating to MainHome');
        navigation.navigate('MainHome');
      } else {
        console.log('Navigating to Login');
        navigation.navigate('Login');
      }
      setIsLoggedIn(loginStatus === 'true');
      console.log('Login Status from async storage: ', loginStatus);
    } catch (error) {
      console.error('Error reading login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <>
      <Drawer.Navigator
        initialRouteName={isLoggedIn ? 'MainHome' : 'SplashScreen'}
        screenOptions={({navigation, route}) => ({
          headerShown: route.name !== 'Login' && route.name !== 'SplashScreen', // Hide header on 'Login' and 'SplashScreen' routes
          headerStyle: {
            backgroundColor: '#EAE9E5',
            height: 60,
          },
          headerTitle: '',
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <Image
                style={{height: 40, width: 40, borderRadius: 30}}
                source={require('../assets/SME_LOGO.png')}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('Toggling drawer');
                navigation.toggleDrawer();
              }}
              style={styles.headerRight}>
              <Icon name="bars" size={22} color="#050301" top={-4} />
            </TouchableOpacity>
          ),
        })}
        drawerContent={props => (
          <CustomDrawerContent {...props} navigation={navigation} />
        )}>
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="MainHome"
          component={BottomTabNavigator}
          options={{
            title: 'Home',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: true,
          }}
        />

        <Drawer.Screen
          name="About"
          component={About}
          options={{
            title: 'About',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />

        <Drawer.Screen
          name="eventDetails"
          component={EventDetails}
          options={{
            drawerItemStyle: {
              display: 'none',
              height: 0,
              width: 0,
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="ConferenceDetails"
          component={ConferenceDetails}
          options={{
            drawerItemStyle: {
              display: 'none',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{
            drawerItemStyle: {
              display: 'none',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerItemStyle: {
              display: 'none',
            },
            drawerLabel: () => null,
            display: false,
          }}
        />
        <Drawer.Screen
          name="Signup"
          component={SignUpForm}
          options={{
            drawerItemStyle: {
              display: 'none',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="Team"
          component={Team}
          options={{
            title: 'Team',
            display: false,
          }}
        />
        <Drawer.Screen
          name="Support"
          component={Support}
          options={{
            title: 'Support',
            display: false,
          }}
        />
        <Drawer.Screen
          name="Member"
          component={Member}
          options={{
            title: 'Member',
            display: false,
          }}
        />
        <Drawer.Screen
          name="AboutDetails"
          component={AboutDetailsPage}
          options={{
            title: 'AboutDetails',
            display: false,
          }}
        />
        <Drawer.Screen
          name="TeamDetailsPage"
          component={TeamDetailsPage}
          options={{
            title: 'TeamDetailsPage',
            display: false,
          }}
        />
        <Drawer.Screen
          name="SupportDetailsPage"
          component={SupportDetailsPage}
          options={{
            title: 'SupportDetailsPage',
            display: false,
          }}
        />
        <Drawer.Screen
          name="MemberDetailsPage"
          component={MemberDetailsPage}
          options={{
            title: 'MemberDetailsPage',
            display: false,
          }}
        />
        <Drawer.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            title: 'SplashScreen',
            display: false,
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 15,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#050301',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
});

export default DrawerNavigator;

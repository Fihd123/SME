import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabNavigator from './BottomTabNavigator';
import EventDetails from '../components/EventCardDetails';
import ConferenceDetails from '../components/ConferenceCardDetails';
import Login from '../screens/Login';
import About from '../screens/About/About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsDetailsScreen from '../components/NewsDetail';
import CustomDropdown from '../screens/About/DropDown';
import SignUpForm from '../screens/SignUp';
import AboutDetailsPage from '../screens/About/AboutDetailsPage';
import SplashScreen from '../screens/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import DrawerProfile from '../screens/Profile/DrawerProfile';
import Events from '../screens/Events/Events';
import Gallery from '../screens/Gallery/Gallery';
import SCM from '../screens/SCM/Scm';
import EventDropdown from '../screens/Events/EventDropdown';
import GalleryDropdown from '../screens/Gallery/GalleryDropdown';
import DrawerNews from '../screens/News/DrawerNews';
import DrawerInterDiv from '../screens/interNational Divisions/DrawerInterDiv';
import CarouselComponent from '../screens/News/News';
import Contact from '../screens/Contact/Contact';
import DrawerContact from '../screens/Contact/DrawerContact';
import InterDivisionDetails from '../screens/interNational Divisions/interDivisionDetails';
import ScmDetails from '../screens/SCM/ScmDetails';

const Drawer = createDrawerNavigator();

const AboutItems = [
  {id: 1, label: 'Introduction', navigation: '1'},
  {id: 9, label: 'Founder & President '},
  {id: 4, label: 'Activities'},
  {id: 17, label: 'Support Services'},
  {id: 18, label: 'Membership'},
];

const EventItems = [
  {
    id: 20,
    label: 'Forthcoming',
  },
  {
    id: 30,
    label: 'Past Events ',
  },
];

const GalleryItems = [
  {
    id: 1,
    label: 'Photos',
  },
  {
    id: 2,
    label: 'Videos',
  },
];
const News = 'News';
const interNational = [
  {
    id: 19,
    label: 'International Divisions',
  },
];
const ContactItem = [
  {
    id: 19,
    label: 'Contact',
  },
];
const Scm = [
  {
    id: 20,
    label: 'SME Connect - Magazine',
  },
];

const CustomDrawerContent = props => {
  const [active, setActive] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      {/* <View>
        <DrawerProfile />
      </View> */}
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
            {descriptor.route.name === 'Events' && (
              <EventDropdown
                label="Events"
                items={EventItems}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'InterDivisions' && (
              <DrawerInterDiv
                label="International Divisions"
                items={interNational}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'SCM' && (
              <SCM
                label="SME Connect - Magazine"
                items={Scm}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'News' && (
              <DrawerNews
                label="News"
                items={News}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'Gallery' && (
              <GalleryDropdown
                label="Gallery"
                items={GalleryItems}
                active={active}
                setActive={setActive}
              />
            )}
            {descriptor.route.name === 'DrawerContact' && (
              <DrawerContact
                label="Contact"
                items={ContactItem}
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
  return (
    <>
      <Drawer.Navigator
        screenOptions={({navigation, route}) => ({
          headerShown: route.name !== 'Login',
          headerStyle: {
            backgroundColor: '#EAE9E5',
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
          name="BottomTab"
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
          name="Events"
          component={Events}
          options={{
            title: 'Event',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />

        <Drawer.Screen
          name="InterDivisions"
          component={DrawerInterDiv}
          options={{
            title: 'International Divisions',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="SCM"
          component={SCM}
          options={{
            title: 'SCM',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="News"
          component={CarouselComponent}
          options={{
            title: 'News',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="Gallery"
          component={Gallery}
          options={{
            title: 'Event',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="DrawerContact"
          component={DrawerContact}
          options={{
            title: 'DrawerContact',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={Contact}
          options={{
            title: 'Contact',
            headerTitleStyle: {
              fontSize: 18,
              color: '#000',
            },
            display: false,
          }}
        />

        <Drawer.Screen
          name="InterDivisionDetails"
          component={InterDivisionDetails}
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
          name="ScmDetails"
          component={ScmDetails}
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
          name="galleryDetails"
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
          name="AboutDetails"
          component={AboutDetailsPage}
          options={{
            title: 'AboutDetails',
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

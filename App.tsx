import React, {useRef} from 'react';
import NavigationContainerWrapper from './src/Navigation';
import {SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/Navigation/Drawer';
import {NavigationProvider} from './src/Context/NavigationContext';

const App = () => {
  const navigationRef = useRef();
  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

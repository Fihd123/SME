import React from 'react';
import NavigationContainerWrapper from './src/screens/Navigation/';
import Navbar from './src/components/Navbar';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Navbar /> */}
      <NavigationContainerWrapper />
    </SafeAreaView>
  );
};

export default App;

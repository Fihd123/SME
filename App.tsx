import React from 'react';
import NavigationContainerWrapper from './src/screens/Navigation/';
import {SafeAreaView, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainerWrapper />
    </SafeAreaView>
  );
};

export default App;

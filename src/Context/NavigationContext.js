import React, {createContext, useContext} from 'react';
import NavigationContainerWrapper from '../Navigation';
import StackRoutes from '../Navigation/index';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({children, navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      {/* <StackRoutes /> */}
      {children}
    </NavigationContext.Provider>
  );
};

import React, {createContext, useContext, useState} from 'react';
import NavigationContainerWrapper from '../Navigation/LoginStack';
import StackRoutes from '../Navigation/LoginStack';

export const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLogin = () => {
    setIsLoggedIn(true);
  };
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    updateLogin,
  };
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

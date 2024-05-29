import React, {createContext, useContext, useState} from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(true);
  const [userId, setUserId] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [profileData, setProfileData] = useState({});
  const updateLogin = () => {
    setIsLoggedIn(true);
  };
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    updateLogin,
    loading,
    setLoading,
    email,
    setEmail,
    userId,
    setUserId,
    userToken,
    setUserToken,
    profileData,
    setProfileData,
  };
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token, refreshToken = '', userID = '') {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);

    if (userID) {
      AsyncStorage.setItem('userID', userID);
      AsyncStorage.setItem('refreshToken', refreshToken);
    }

    AsyncStorage.setItem('tokenTime', new Date().toISOString());
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('refreshToken');
    AsyncStorage.removeItem('tokenTime');
    AsyncStorage.removeItem('userID');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

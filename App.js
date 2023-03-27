import './polyfills';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import TasksContextProvider from './store/tasks-context';

import SettingContextProvider from './store/settings-context';

import ManageTasksScreen from './screens/ManageTasksScreen';
import ManagePomodoroScreen from './screens/ManagePomodoroScreen';
import Tabs from './navigation/tabs';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        showHeader: false,
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="tabs" component={Tabs} />
      <Stack.Screen name="AddTasks" component={ManageTasksScreen} />
      <Stack.Screen name="ManagePomodoro" component={ManagePomodoroScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const checkTokenValidity = async () => {
    // Get the tokenTime from async storage
    const tokenTime = await AsyncStorage.getItem('tokenTime');
    const userID = await AsyncStorage.getItem('userID');

    if (tokenTime && userID) {
      // Add 3600 seconds to the tokenTime
      let tokenExpirationTime = new Date(tokenTime);
      tokenExpirationTime.setSeconds(tokenExpirationTime.getSeconds() + 1000);
      tokenExpirationTime = new Date(tokenExpirationTime);

      // Compare the tokenExpirationTime to the current time
      const currentTime = new Date();

      if (tokenExpirationTime < currentTime) {
        // Token has expired
        return false;
      } else {
        // Token is still valid
        return true;
      }
    } else {
      // Token not found in async storage
      return false;
    }
  };

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const validToken = await checkTokenValidity();

      if (storedToken && validToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <TasksContextProvider>
          <SettingContextProvider>
            <Root />
          </SettingContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
    </>
  );
}

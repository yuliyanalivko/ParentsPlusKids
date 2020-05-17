import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "./screens/login/WelcomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {LoginScreen} from "./screens/login/LoginScreen";
import {EnterCodeScreen} from "./screens/login/EnterCodeScreen";
import {RegistrationScreen} from "./screens/login/RegistrationScreen";
import {PasswordRecoveryScreen} from "./screens/login/PasswordRecoveryScreen";

import {ParentBottomTabNavigator} from './navigation/ParentBottomTabNavigator';
import { AddTaskScreen } from "./screens/AddTaskScreen";
import { ParentChildScreen } from "./screens/ParentChildScreen";

import {ChildBottomTabNavigator} from './navigation/ChildBottomTabNavigator';
import TestScreen from "./screens/TestScreen";
import {ChildParentScreen} from "./screens/ChildParentScreen";


import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        <View style={styles.container}>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator screenOptions={{headerShown: false}}>

              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
              <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />

              <Stack.Screen name="ParentNavigator" component={ParentBottomTabNavigator} />
              <Stack.Screen name="AddTask" component={AddTaskScreen} />
              <Stack.Screen name="Child" component={ParentChildScreen} />

              <Stack.Screen name="ChildNavigator" component={ChildBottomTabNavigator} />
              <Stack.Screen name="Test" component={TestScreen} />
              <Stack.Screen name="Parent" component={ChildParentScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

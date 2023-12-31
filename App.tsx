/**
 * Scaler School of Technology Application
 * @format
 */

import React, {useEffect, useState, createContext, useRef} from 'react'; // importing react module
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message'; // module to flash messages on device screen
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {domain_URL, APP_VERSION} from './src/constants';
import DidContext from './src/contexts/DidContext';
import UserContext from './src/contexts/UserContext';
import DeviceInfo from 'react-native-device-info';

import SignInScreen from './src/screens/SignInScreen';
import CurrentClassScreen from './src/screens/CurrentClassScreen';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [did, setdid] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const navigationRef = useRef(null);

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setdid(uniqueId);
    });
  }, []);

  function onSuccessRegister(initResponse) {
    setUserInfo({
      userName: initResponse.name,
      userEmail: initResponse.mail,
    });
    navigationRef.current.navigate('CurrentClassScreen');
  }

  return (
    <DidContext.Provider value={did}>
      <UserContext.Provider
        value={{...userInfo, onSuccessRegister: onSuccessRegister}}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CurrentClassScreen"
              component={CurrentClassScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <FlashMessage position="bottom" style={{marginBottom: '5%'}} />
        </NavigationContainer>
      </UserContext.Provider>
    </DidContext.Provider>
  );
}

const msstyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    width: '90%',
    height: 65,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  data: {
    color: '#cacaca',
    fontSize: 18,
    paddingLeft: 25,
    fontFamily: 'Alata Regular',
  },
});

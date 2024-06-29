import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './navigation/StackNavigation.tsx';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    //SplashScreen.hide();
  }, []);

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('1c10bc19-cbe8-42cb-ac43-f398591db961');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  //const notification = new OneSignal.Notification();

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;

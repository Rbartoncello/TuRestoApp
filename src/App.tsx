import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './navigation/StackNavigation.tsx';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import AnimatedSplashScreen from './components/AnimatedSplashScreen';

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
    SplashScreen.hide(); // Oculta el SplashScreen nativo una vez que la animación termina
  };

  useEffect(() => {
    // Si quieres ocultar el splash después de un cierto tiempo o esperar alguna carga inicial
    const timeout = setTimeout(() => {
      if (isSplashVisible) {
        handleSplashFinish(); // Asegúrate de que se oculte si la animación aún no ha terminado
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isSplashVisible]);

  // Si el splash está visible, mostramos la pantalla animada
  if (isSplashVisible) {
    return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
  }

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

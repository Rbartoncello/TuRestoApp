import * as React from 'react';
import LoginScreen from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import {Header} from '../components';
import {useSessionStore} from '../state/session/slice.ts';
import Routes from './routes.ts';
import RegisterScreen from '../screens/Register';

export type RootStackParams = {
  [Routes.LOGIN]: undefined;
  [Routes.HOME]: undefined;
  [Routes.REGISTER]: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const options = {
  header: (props: any) => <Header {...props} />,
};

export const StackNavigation = () => {
  const {token} = useSessionStore();
  return (
    <Stack.Navigator
      initialRouteName={token ? Routes.HOME : Routes.LOGIN}
      screenOptions={options}>
      <Stack.Screen
        name={Routes.LOGIN}
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name={Routes.REGISTER}
        options={{headerShown: false}}
        component={RegisterScreen}
      />
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

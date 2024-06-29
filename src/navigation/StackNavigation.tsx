import * as React from 'react';
import LoginScreen from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import {Header} from '../components';
import Routes from './routes.ts';
import RegisterScreen from '../screens/Register';
import MenuListScreen from '../screens/MenuList';
import ProductDetailScreen from '../screens/ProductDetals';
import PendingClientsScreen from '../screens/PendingClientsScreen';
import SelectionScreen from '../screens/Selection';
import PendingOrdersScreen from '../screens/PendingOrders';
import WaitingClientsScreen from '../screens/waitingClients';
import ReleaseTableScreen from '../screens/ReleaseTable';

export type RootStackParams = {
  [Routes.LOGIN]: undefined;
  [Routes.HOME]: undefined;
  [Routes.REGISTER]: undefined;
  [Routes.MENU_LIST]: undefined;
  [Routes.PRODUCT_DETAILS]: {id: number};
  [Routes.CLIENT_PENDINGS]: undefined;
  [Routes.SELECTION]: undefined;
  [Routes.ORDERS]: undefined;
  [Routes.ASSIGMENT]: undefined;
  [Routes.TABLES]: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const options = {
  header: (props: any) => <Header {...props} />,
};

export const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.LOGIN} screenOptions={options}>
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
      <Stack.Screen name={Routes.MENU_LIST} component={MenuListScreen} />
      <Stack.Screen
        name={Routes.PRODUCT_DETAILS}
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name={Routes.CLIENT_PENDINGS}
        component={PendingClientsScreen}
      />
      <Stack.Screen name={Routes.SELECTION} component={SelectionScreen} />
      <Stack.Screen name={Routes.ORDERS} component={PendingOrdersScreen} />
      <Stack.Screen name={Routes.ASSIGMENT} component={WaitingClientsScreen} />
      <Stack.Screen name={Routes.TABLES} component={ReleaseTableScreen} />
    </Stack.Navigator>
  );
};

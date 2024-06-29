import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useSessionStore} from '../../state/session/slice.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';
import Routes from '../../navigation/routes.ts';
import {ROLES} from '../../state/users/interfaces.ts';

const SelectionScreen = () => {
  const {user} = useSessionStore();
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();

  const handleScanQR = () => {
    navigate(Routes.HOME);
  };

  const handleClientList = () => {
    navigate(Routes.CLIENT_PENDINGS);
  };

  const handlePendingOrders = () => {
    navigate(Routes.ORDERS);
  };

  const handlePendingClients = () => {
    navigate(Routes.ASSIGMENT);
  };

  const handleTables = () => {
    navigate(Routes.TABLES);
  };

  return (
    <View style={styles.container}>
      <Button title="Escanear QR" onPress={handleScanQR} />
      {user?.rol === ROLES.OWNER && (
        <Button title="Lista de Clientes" onPress={handleClientList} />
      )}
      {user?.rol === ROLES.WAITER && (
        <Button title="Pedidos pendientes" onPress={handlePendingOrders} />
      )}
      {user?.rol === ROLES.WAITER && (
        <Button title="Mesas" onPress={handleTables} />
      )}
      {user?.rol === ROLES.MAITRE && (
        <Button title="Clientes en espera" onPress={handlePendingClients} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
});

export default SelectionScreen;

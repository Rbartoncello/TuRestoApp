import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Alert} from 'react-native';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import {Client, CLIENT_STATES} from '../../interfaces/client';
import {Table, TABLE_STATES} from '../../interfaces/table';
import {ListItem} from '@rneui/themed';
import {UserIcon} from '../../assets/icons';
import colors from '../../theme/base/colors.ts';

const WaitingClientsScreen = () => {
  const [waitingClients, setWaitingClients] = useState<Client[]>([]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingClients = async () => {
      const clientRef = collection(FIREBASE_DB, 'clients');
      const queryFirebase = query(
        clientRef,
        where('state', '==', CLIENT_STATES.ACCEPTED),
      );
      const queryResult = await getDocs(queryFirebase);
      const clientsList = queryResult.docs.map(
        doc => ({id: doc.id, ...doc.data()} as Client),
      );
      setWaitingClients(clientsList);
    };
    const fetchAvailableTables = async () => {
      const tableRef = collection(FIREBASE_DB, 'tables');
      const queryFirebase = query(
        tableRef,
        where('state', '==', TABLE_STATES.EMPTY),
      );
      const queryResult = await getDocs(queryFirebase);
      const tableList = queryResult.docs.map(
        doc => ({id: doc.id, ...doc.data()} as Table),
      );
      setAvailableTables(tableList);
    };
    fetchPendingClients();
    fetchAvailableTables();
  }, []);

  const handleAssign = async (clientId: string, tableId: string) => {
    const clientRef = doc(FIREBASE_DB, 'clients', clientId);
    const tableRef = doc(FIREBASE_DB, 'tables', tableId);

    await updateDoc(clientRef, {state: CLIENT_STATES.SITTING});
    await updateDoc(tableRef, {
      state: TABLE_STATES.CUSTOMER_WAITING_ATTENTION,
      clientId: clientId,
    });

    setWaitingClients(waitingClients.filter(client => client.id !== clientId));
    setAvailableTables(availableTables.filter(table => table.id !== tableId));
    Alert.alert('Cliente asignado en mesa');
  };

  const renderClientItem = ({item}: {item: Client}) => (
    <ListItem.Accordion
      key={item.id}
      isExpanded={expanded === item.id}
      onPress={() => setExpanded(expanded === item.id ? null : item.id)}
      content={
        <>
          <UserIcon color={colors.black} />
          <ListItem.Title>{item.name}</ListItem.Title>
        </>
      }>
      <ListItem.Content>
        {availableTables.map(table => (
          <ListItem key={table.id} bottomDivider>
            <ListItem.Title>{`Mesa ${table.id}`}</ListItem.Title>

            <Button
              title="Asignar"
              onPress={() => handleAssign(item.email, table.id)}
            />
          </ListItem>
        ))}
      </ListItem.Content>
    </ListItem.Accordion>
  );

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 20, marginBotton: 10}}>
        Clientes esperando asignacion:{' '}
      </Text>
      <FlatList
        data={waitingClients}
        renderItem={renderClientItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default WaitingClientsScreen;

import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Text, View} from 'react-native';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {Client} from '../../interfaces/client';
import {Table, TABLE_STATES} from '../../interfaces/table';
import {ListItem} from '@rneui/themed';
import {UserIcon} from '../../assets/icons';
import colors from '../../theme/colors.ts';
import {useUsersActions} from '../../state/users/actions.tsx';
import {useUsersStore} from '../../state/users/slice.ts';
import {CLIENT_STATES, ROLES} from '../../state/users/interfaces.ts';

const WaitingClientsScreen = () => {
  const [waitingClients, setWaitingClients] = useState<Client[]>([]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const {getUsers} = useUsersActions();
  const {users} = useUsersStore();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWaitingClients(
      users.filter(
        u => u.rol === ROLES.CLIENT && u.state === CLIENT_STATES.ACCEPTED,
      ),
    );
  }, [users]);

  useEffect(() => {
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
    <View
      style={{flex: 1, padding: 20, backgroundColor: colors.grayBackground}}>
      <Text style={{fontSize: 20, marginBotton: 10, color: colors.black}}>
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

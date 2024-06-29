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
  getDoc,
} from 'firebase/firestore';
import {Table, TABLE_STATES} from '../../interfaces/table';
import {CLIENT_STATES} from '../../interfaces/client';
import {ListItem} from '@rneui/themed';

const ReleaseTableScreen = () => {
  const [occupiedTable, setOccupiedTable] = useState<Table[]>([]);

  useEffect(() => {
    const fetchOccupiedTables = async () => {
      const tableRef = collection(FIREBASE_DB, 'tables');
      const queryFirebase = query(
        tableRef,
        where('state', '==', TABLE_STATES.CUSTOMER_PAYING),
      );
      const queryResult = await getDocs(queryFirebase);
      const tableList = queryResult.docs.map(
        doc => ({id: doc.id, ...doc.data()} as Table),
      );
      setOccupiedTable(tableList);
    };
    fetchOccupiedTables();
  }, []);

  const handleRelease = async (tableId: string) => {
    const tableRef = doc(FIREBASE_DB, 'tables', tableId);
    const tableDoc = await getDoc(tableRef);
    const tableData = tableDoc.data();

    if (tableData.state !== TABLE_STATES.CUSTOMER_PAYING) {
      Alert.alert('Error', 'El cliente no se encuentra pagando');
      return;
    }

    const clientRef = doc(FIREBASE_DB, 'clients', tableData.clientId);
    const clientDoc = await getDoc(clientRef);
    const clientData = clientDoc.data();

    if (clientData.state !== CLIENT_STATES.PAID) {
      Alert.alert('Error', 'El cliente no pago todavia');
      return;
    }

    await updateDoc(tableRef, {state: TABLE_STATES.EMPTY, clientId: ''});

    Alert.alert('Mesa liberada');
    setOccupiedTable(occupiedTable.filter(table => table.id !== tableId));
  };

  const renderTableItem = ({item}: {item: Table}) => (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{`Mesa ${item.id}`}</ListItem.Title>
      </ListItem.Content>
      <Button title="Liberar" onPress={() => handleRelease(item.id)} />
    </ListItem>
  );

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 20, marginBottom: 10}}>Mesas ocupadas:</Text>
      <FlatList
        data={occupiedTable}
        renderItem={renderTableItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No hay mesas ocupadas.</Text>}
      />
    </View>
  );
};

export default ReleaseTableScreen;

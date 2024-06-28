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

const PendingClientsScreen = () => {
  const [pendingClients, setPendingClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchPendingClients = async () => {
      const clientRef = collection(FIREBASE_DB, 'clients');
      const q = query(
        clientRef,
        where('state', '==', CLIENT_STATES.PENDING_APPROVAL),
      );
      const querySnapshot = await getDocs(q);
      const clientsList = querySnapshot.docs.map(
        doc => ({id: doc.id, ...doc.data()} as Client),
      );
      setPendingClients(clientsList);
    };

    fetchPendingClients();
  }, []);

  const handleAccept = async (clientId: string) => {
    const clientRef = doc(FIREBASE_DB, 'clients', clientId);
    await updateDoc(clientRef, {state: CLIENT_STATES.ACCEPTED});
    Alert.alert('Cliente aceptado');
    setPendingClients(pendingClients.filter(client => client.id !== clientId));
  };

  const handleReject = async (clientId: string) => {
    const clientRef = doc(FIREBASE_DB, 'clients', clientId);
    await updateDoc(clientRef, {state: CLIENT_STATES.REFUSED});
    Alert.alert('Cliente rechazado');
    setPendingClients(pendingClients.filter(client => client.id !== clientId));
  };

  const renderItem = ({item}: {item: Client}) => (
    <View>
      <Text>{item.name}</Text>
      <Button title="Aceptar" onPress={() => handleAccept(item.email)} />
      <Button title="Rechazar" onPress={() => handleReject(item.email)} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={pendingClients}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default PendingClientsScreen;

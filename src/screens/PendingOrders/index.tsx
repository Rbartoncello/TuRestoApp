import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import LabelInput from '../../components/LabelInput/LabelInput.tsx';

const PendingOrdersScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = await getDocs(collection(FIREBASE_DB, 'orders'));
      const ordersData = query.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setOrders(ordersData.filter(order => order.state === 'Pendiente'));
    };
    fetchOrders();
  }, []);

  const confirmOrder = async orderId => {
    const orderRef = doc(FIREBASE_DB, 'orders', orderId);
    await updateDoc(orderRef, {
      state: 'confirmed',
    });
    setOrders(orders.filter(order => order.id !== orderId));
    Alert.alert('Exito', 'Pedido confirmado');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        contentContainerStyle={{
          flex: 1,
          margin: 20,
          borderRadius: 10,
          padding: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.orderItem}>
            <View>
              <LabelInput label={'Numero de orden: '} />
              <Text style={{color: '#000'}}>{item.id}</Text>
            </View>
            <Button title="Confirmar" onPress={() => confirmOrder(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    gap: 10,
  },
});

export default PendingOrdersScreen;

import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import LabelInput from '../../components/LabelInput/LabelInput.tsx';
import {STATUS_ORDER} from '../../state/orders/interfeces.ts';
import {useBoolean} from '../../hooks';
import Modal from '../../components/Modal';
import {useProductsStore} from '../../state/products/slice.ts';
import {LoadingOverlay, Title} from '../../components';
import colors from '../../theme/colors.ts';
import {useOrdersActions} from '../../state/orders/actions.tsx';
import {useOrdersStore} from '../../state/orders/slice.ts';

const PendingOrdersScreen = () => {
  const [active, setActive] = useBoolean(false);
  const [orderId, setOrderId] = useState<number | undefined>(undefined);
  const {products, status} = useProductsStore();
  const {orders, status: statusOrder} = useOrdersStore();
  const {fetchOrders, confirmOrder} = useOrdersActions();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {(status.isFetching || statusOrder.isFetching) && <LoadingOverlay />}
      <Title style={{fontSize: 40}}>Lista de ordenes</Title>
      <FlatList
        data={orders.filter(o => o.state === STATUS_ORDER.PENDENT)}
        contentContainerStyle={{
          flex: 1,
          gap: 10,
          margin: 20,
          borderRadius: 10,
          padding: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.orderItem}>
            <View>
              <LabelInput label={'Numero de orden: '} />
              <Text style={{color: '#000'}}>{item.id}</Text>
            </View>
            <Button
              title="Confirmar"
              onPress={() => {
                setOrderId(item.id);
                setActive.on();
              }}
            />
          </View>
        )}
      />
      <Modal
        active={active}
        setActive={setActive}
        onConfirm={() => {
          confirmOrder(orderId!);
          setActive.off();
        }}
        title={'¿Esta seguro que quiere confirmar el siguiente pedido?'}>
        <View style={{gap: 5, marginBottom: 20}}>
          {orders
            .find(o => o.id === orderId)
            ?.products.map((p, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#000'}}>
                  {products.find(pr => pr.id.toString() === p.id)?.name}
                </Text>
                <Text style={{color: '#000'}}>x{p.count}</Text>
              </View>
            ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayBackground,
  },
  orderItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: '#000',
    flexDirection: 'row',
    gap: 10,
    width: '90%',
    elevation: 10,
    backgroundColor: colors.white,
    borderRadius: 9,
  },
});

export default PendingOrdersScreen;

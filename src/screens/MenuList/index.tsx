import React, {FC, useEffect, useState} from 'react';
import type {MenuScreenProps} from './types';
import {LoadingOverlay, Text} from '../../components';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './styles.ts';
import Routes from '../../navigation/routes.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';
import {useProductsStore} from '../../state/products/slice.ts';
import {Divider} from '@rneui/base';
import {useOrdersStore} from '../../state/orders/slice.ts';
import colors from '../../theme/colors.ts';
import {useBoolean} from '../../hooks';
import Modal from '../../components/Modal';
import {useOrdersActions} from '../../state/orders/actions.tsx';

const MenuListScreen: FC<MenuScreenProps> = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();
  const {products, status} = useProductsStore();
  const {
    products: ProductsSelected,
    setProducts,
    status: statusOrder,
  } = useOrdersStore();
  const {createOrder} = useOrdersActions();
  const [maxTime, setMaxTime] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useBoolean(false);
  const [open2, setOpen2] = useBoolean(false);

  useEffect(() => {
    const productsFilter = products.filter(p =>
      ProductsSelected.some(ps => ps.id === p.id.toString()),
    );

    const totalCost = productsFilter.reduce((accumulator, currentValue) => {
      const product = ProductsSelected?.find(
        p => p?.id.toString() === currentValue?.id.toString(),
      );
      const count = product?.count ?? 1;
      return accumulator + Number(currentValue.price) * count;
    }, 0);
    const maxTimeProduct = productsFilter.reduce(
      (max, current) =>
        Number(current.time) > Number(max.time) ? current : max,
      productsFilter[0],
    )?.time;

    setMaxTime(maxTimeProduct);
    setTotal(totalCost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ProductsSelected]);

  return (
    <View style={styles.root}>
      {(status.isFetching || statusOrder.isFetching) && <LoadingOverlay />}
      <View style={styles.root}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Menú</Text>
          <Text style={styles.subtitle}>
            Elija el mejor plato para tener un gran día.
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <FlatList
            data={products}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigate(Routes.PRODUCT_DETAILS, {id: item.id})
                  }
                  style={styles.itemContainer}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  <Image
                    source={{uri: item.images[0].image}}
                    style={styles.itemImage}
                  />
                </TouchableOpacity>
                <Divider />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
      {total !== 0 && (
        <TouchableOpacity
          style={{
            position: 'relative',
            backgroundColor: colors.orange_400,
            height: 50,
            borderRadius: 25,
            justifyContent: 'space-around',
            padding: 5,
            paddingHorizontal: 25,
            flexDirection: 'row',
            marginBottom: 5,
            marginHorizontal: 2,
            elevation: 8,
          }}
          onPress={() => setOpen.on()}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Total: {total}</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Tiempo: {maxTime}'
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        active={open}
        setActive={setOpen}
        onConfirm={() => {
          createOrder(total, maxTime.toString());
          setOpen.off();
          setOpen2.on();
        }}
        title={'Su orden es: '}>
        <View style={{gap: 5, marginBottom: 20}}>
          {ProductsSelected.map((p, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>
                {products.find(pr => pr.id.toString() === p.id)?.name}
              </Text>
              <Text>x{p.count}</Text>
            </View>
          ))}
        </View>
      </Modal>
      <Modal
        active={open2}
        setActive={setOpen2}
        onConfirm={() => {
          setOpen2.off();
          setProducts([]);
          navigate(Routes.HOME);
        }}
        title={'Su pedido a sido generado con exito'}
        message={'Por favor espere que el mozo lo confirme, Gracias'}
      />
    </View>
  );
};

export default MenuListScreen;

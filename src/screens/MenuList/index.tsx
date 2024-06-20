import React, {FC, useEffect} from 'react';
import type {MenuScreenProps} from './types';
import {LoadingOverlay, Text} from '../../components';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './styles.ts';
import Routes from '../../navigation/routes.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';
import {useProductsActions} from '../../state/products/actions.tsx';
import {useProductsStore} from '../../state/products/slice.ts';
import {Divider} from '@rneui/base';

const MenuListScreen: FC<MenuScreenProps> = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();
  const {getProducts} = useProductsActions();
  const {products, status} = useProductsStore();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      {status.isFetching && <LoadingOverlay />}
      <View style={styles.root}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Menu</Text>
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
      {/*<View*/}
      {/*  style={{*/}
      {/*    backgroundColor: colors.gray_200,*/}
      {/*    height: 50,*/}
      {/*    borderTopEndRadius: 25,*/}
      {/*    borderTopStartRadius: 25,*/}
      {/*    justifyContent: 'space-around',*/}
      {/*    padding: 5,*/}
      {/*    paddingHorizontal: 25,*/}
      {/*    flexDirection: 'row',*/}
      {/*  }}>*/}
      {/*  <Text style={{fontSize: 25, fontWeight: 'bold'}}>Total:</Text>*/}
      {/*  <Text style={{fontSize: 25, fontWeight: 'bold'}}>Tiempo:</Text>*/}
      {/*</View>*/}
    </View>
  );
};

export default MenuListScreen;

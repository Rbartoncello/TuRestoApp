import React, {FC, useEffect, useState} from 'react';
import type {ProductDetailScreenProps} from './types';
import {LoadingOverlay, Text} from '../../components';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './styles.ts';
import colors from '../../theme/colors.ts';
import {LessIcon, PlusIcon, TimerIcon} from '../../assets/icons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';
import Routes from '../../navigation/routes.ts';
import {useProductsActions} from '../../state/products/actions.tsx';
import {Product} from '../../state/products/interfeces.ts';
import {useProductsStore} from '../../state/products/slice.ts';

const ProductDetailScreen: FC<ProductDetailScreenProps> = () => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const {getProductById} = useProductsActions();
  const {params} =
    useRoute<RouteProp<RootStackParams, Routes.PRODUCT_DETAILS>>();
  const {status} = useProductsStore();

  useEffect(() => {
    setProduct(getProductById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {goBack} = useNavigation();

  return status.isFetching || !product ? (
    <LoadingOverlay />
  ) : (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <FlatList
          data={product.images}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.flatListTouchable}>
              <Image source={{uri: item.image}} style={styles.image} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsTitle}>
          <Text style={styles.detailsTitleText}>{product?.name}</Text>
        </View>
        <View style={styles.detailsDescription}>
          <Text>{product?.description}</Text>
        </View>
        <View style={styles.priceTimeContainer}>
          <Text style={styles.priceText}>${product?.price}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.priceText}>{product?.time}'</Text>
            <TimerIcon />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Tu pedido</Text>
          <Text style={styles.footerText}>${product?.price * count}</Text>
        </View>
        <View style={styles.footerControls}>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              disabled={count === 1}
              onPress={() => setCount(count - 1)}>
              <LessIcon color={count === 1 ? colors.gray_100 : colors.black} />
            </TouchableOpacity>
            <Text style={styles.counterText}>{count}</Text>
            <TouchableOpacity
              disabled={count === 10}
              onPress={() => setCount(count + 1)}>
              <PlusIcon color={count === 10 ? colors.gray_100 : colors.black} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => goBack()}>
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

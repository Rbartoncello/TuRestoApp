import {useOrdersStore} from './slice.ts';
import {Order, ORDER_STATUS} from './interfeces.ts';
import {doc, setDoc} from 'firebase/firestore';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';

export const useOrdersActions = () => {
  const {products, setProducts, setStatus} = useOrdersStore();
  const createOrder = async (total: number, time: string) => {
    setStatus(getStartStatus());
    const newOrder: Order = {
      id: new Date().getTime(),
      products: products,
      totalPrice: total,
      totalTime: time,
      state: ORDER_STATUS.PENDENT,
    };

    console.log(newOrder);

    try {
      await setDoc(doc(FIREBASE_DB, 'orders', `${newOrder.id}`), newOrder);
      setStatus(getSuccessStatus());
    } catch (error) {
      setStatus(getErrorStatus());
    }
  };

  const addProductToOrder = (id: string, count: number) => {
    const uploadProduct = products.map(p => {
      if (p.id === id) {
        return {id: id, count: count};
      }
      return p;
    });
    setProducts(
      !products.find(p => p.id === id)
        ? [...products, {id, count}]
        : uploadProduct,
    );
  };

  return {createOrder, addProductToOrder};
};

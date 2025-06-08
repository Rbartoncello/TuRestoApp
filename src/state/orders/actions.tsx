import {useOrdersStore} from './slice.ts';
import {Order, STATUS_ORDER} from './interfeces.ts';
import {collection, doc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';

export const useOrdersActions = () => {
  const {products, setProducts, setStatus, setOrders, orders} =
    useOrdersStore();
  const createOrder = async (total: number, time: string) => {
    setStatus(getStartStatus());
    const newOrder: Order = {
      id: new Date().getTime(),
      products: products,
      totalPrice: total,
      totalTime: time,
      state: STATUS_ORDER.PENDENT,
    };

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

  const fetchOrders = async () => {
    setStatus(getStartStatus());
    try {
      const query = await getDocs(collection(FIREBASE_DB, 'orders'));
      const ordersData = query.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersData);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus());
    }
  };

  const confirmOrder = async (id: number) => {
    setStatus(getStartStatus());
    try {
      const orderRef = doc(FIREBASE_DB, 'orders', id.toString());
      await updateDoc(orderRef, {
        state: STATUS_ORDER.CONFIRM,
      });
      setOrders(
        orders.map(o => {
          if (o.id.toString() === id.toString()) {
            return {...o, state: STATUS_ORDER.CONFIRM};
          }
          return o;
        }),
      );
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus());
    }
  };

  return {createOrder, addProductToOrder, confirmOrder, fetchOrders};
};

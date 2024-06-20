import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {collection, getDocs} from 'firebase/firestore';
import {Product} from './interfeces.ts';
import {useProductsStore} from './slice.ts';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';

export const useProductsActions = () => {
  const {setProducts, setStatus, products} = useProductsStore();
  const getProducts = async () => {
    setStatus(getStartStatus());
    try {
      const collectionRef = collection(FIREBASE_DB, 'products');
      const querySnapshot = await getDocs(collectionRef);

      const idsImages = [1, 2, 3];

      const dataPromises = querySnapshot.docs.map(async res => {
        const prod = res.data() as Product;

        const imagePromises = idsImages.map(idImage =>
          getImageURL(`/products/${prod.id}/${idImage}.png`).then(url => ({
            id: idImage,
            image: url,
          })),
        );

        const images = await Promise.all(imagePromises);
        return {...prod, images: images};
      });

      const data = await Promise.all(dataPromises);

      setStatus(getSuccessStatus());
      setProducts(data || []);
    } catch (error) {
      setStatus(getErrorStatus(error));
      throw error;
    }
  };

  const getProductById = (id: number): Product | undefined => {
    if (!products) {
      return;
    }
    return products.find(product => product.id === id);
  };

  const getImageURL = async (path: string) => {
    try {
      const storageRef = ref(getStorage(), path);
      return await getDownloadURL(storageRef);
    } catch (e) {
      console.error('Failed to get download URL:', e);
      throw e;
    }
  };

  return {getProducts, getProductById};
};

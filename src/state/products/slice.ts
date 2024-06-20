import {getDefaultStatus, Status} from '../helper/statusStateFactory.ts';
import {create} from 'zustand';
import {Product} from './interfeces.ts';

type State = {
  status: Status;
  products: Product[] | [];
};

const initialState = {
  products: [],
  status: getDefaultStatus(),
};

type Action = {
  setProducts: (products: Product[] | []) => void;
  setStatus: (status: Status) => void;
};

export const useProductsStore = create<State & Action>(set => ({
  ...initialState,
  setProducts: (products: Product[] | []) => set(() => ({products})),
  setStatus: (status: Status) => set(() => ({status})),
}));

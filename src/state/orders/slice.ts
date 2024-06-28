import {getDefaultStatus, Status} from '../helper/statusStateFactory.ts';
import {create} from 'zustand';
import {Order} from './interfeces.ts';

type State = {
  status: Status;
  order: Order | {};
  products: {id: string; count: number}[] | [];
};

const initialState = {
  order: {},
  status: getDefaultStatus(),
  products: [],
};

type Action = {
  setOrder: (order: Order | {}) => void;
  setStatus: (status: Status) => void;
  setProducts: (products: {id: string; count: number}[]) => void;
};

export const useOrdersStore = create<State & Action>(set => ({
  ...initialState,
  setOrder: (order: Order | {}) => set(() => ({order})),
  setStatus: (status: Status) => set(() => ({status})),
  setProducts: (products: {id: string; count: number}[]) =>
    set(() => ({products})),
}));

import {getDefaultStatus, Status} from '../helper/statusStateFactory.ts';
import {create} from 'zustand';
import {Table} from './interfaces.ts';

type State = {
  status: Status;
  tables: Table[] | [];
};

const initialState = {
  token: '',
  tables: [],
  status: getDefaultStatus(),
};

type Action = {
  setTables: (users: Table[] | []) => void;
  setStatus: (status: Status) => void;
};

export const useTablesStore = create<State & Action>(set => ({
  ...initialState,
  setStatus: (status: Status) => set(() => ({status})),
  setTables: (tables: Table[] | []) => set(() => ({tables})),
}));

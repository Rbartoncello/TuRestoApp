import {getDefaultStatus, Status} from '../helper/statusStateFactory.ts';
import {create} from 'zustand';
import {User} from './interfaces.ts';

type State = {
  status: Status;
  token: string;
  user: User | undefined;
  users: User[] | [];
};

const initialState = {
  token: '',
  user: undefined,
  users: [],
  status: getDefaultStatus(),
};

type Action = {
  setToken: (token: string) => void;
  setUser: (user: User | undefined) => void;
  setUsers: (users: User[] | []) => void;
  setStatus: (status: Status) => void;
};

export const useUsersStore = create<State & Action>(set => ({
  ...initialState,
  setToken: (token: string) => set(() => ({token})),
  setUser: (user: User | undefined) => set(() => ({user})),
  setStatus: (status: Status) => set(() => ({status})),
  setUsers: (users: User[] | []) => set(() => ({users})),
}));

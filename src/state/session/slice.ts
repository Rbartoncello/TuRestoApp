import {getDefaultStatus, Status} from '../helper/statusStateFactory.ts';
import {create} from 'zustand';
import {Client} from '../../interfaces/client.ts';

type State = {
  status: Status;
  token: string;
  user: Client | undefined;
};

const initialState = {
  token: '',
  user: undefined,
  status: getDefaultStatus(),
};

type Action = {
  setToken: (token: string) => void;
  setUser: (user: Client | undefined) => void;
  setStatus: (status: Status) => void;
};

export const useSessionStore = create<State & Action>(set => ({
  ...initialState,
  setToken: (token: string) => set(() => ({token})),
  setUser: (user: Client | undefined) => set(() => ({user})),
  setStatus: (status: Status) => set(() => ({status})),
}));

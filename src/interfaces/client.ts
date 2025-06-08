import {User, CLIENT_STATES} from '../state/users/interfaces.ts';

export interface Client extends User {
  idTable?: string | number;
  isUnknown: boolean;
  state: CLIENT_STATES;
}

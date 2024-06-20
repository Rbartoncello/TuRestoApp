import {ROLES} from '../interfaces/client.ts';

export const users: {
  id: number;
  email: string;
  password: string;
  rol: ROLES | string;
}[] = [
  {
    id: 1,
    email: 'client1@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
  {
    id: 2,
    email: 'client2@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
];

import {ROLES} from '../state/users/interfaces.ts';

export const users: {
  id: number;
  email: string;
  password: string;
  rol: ROLES | string;
}[] = [
  {
    id: 1,
    email: 'mozo_1@yopmail.com',
    password: '123456',
    rol: ROLES.WAITER,
  },
  {
    id: 2,
    email: 'client1@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
  {
    id: 3,
    email: 'client2@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
  {
    id: 4,
    email: 'test8@outlook.com',
    password: '123456',
    rol: ROLES.MAITRE,
  },
  {
    id: 5,
    email: 'duenio1@yopmail.com',
    password: '123456',
    rol: ROLES.OWNER,
  },
  {
    id: 6,
    email: 'anonimo@anonymus.com',
    password: '123456',
    rol: ROLES.ANONYMUS,
  },
];

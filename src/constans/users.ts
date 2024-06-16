import {ROLES} from '../interfaces/client.ts';

export const users: {
  id: number;
  email: string;
  password: string;
  rol: ROLES | string;
}[] = [
  /*{
    id: 1,
    email: 'admin@admin.com',
    password: '111111',
    rol: 'admin',
  },
  {
    id: 2,
    email: 'invitado@invitado.com',
    password: '222222',
    rol: 'bartender',
  },
  {
    id: 3,
    email: 'usuario@usuario.com',
    password: '333333',
    rol: 'mozo',
  },*/
  {
    id: 4,
    email: 'client1@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
  {
    id: 5,
    email: 'client2@test.com',
    password: '123456',
    rol: ROLES.CLIENT,
  },
];

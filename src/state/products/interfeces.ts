import {ROLES} from '../users/interfaces.ts';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  responsible: ROLES;
  time: number;
  images: {id: number; image: string}[];
}

export interface Order {
  id: number;
  products: {id: string; count: number}[];
  state: STATUS_ORDER;
  totalPrice: number;
  totalTime: string;
}

export const enum STATUS_ORDER {
  PENDENT = 'Pendiente',
  CONFIRM = 'Confirmado',
}

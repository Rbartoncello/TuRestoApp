export interface Order {
  id: number;
  products: {id: string; count: number}[];
  state: ORDER_STATUS;
  totalPrice: number;
  totalTime: string;
}

export const enum ORDER_STATUS {
  PENDENT = 'Pendiente',
  CONFIRM = 'Confirmado',
}

export interface Table {
  id: string | number;
  state: TABLE_STATES;
}

export enum TABLE_STATES {
  RESERVED = 'reservado',
  EMPTY = 'vacia',
  CUSTOMER_WAITING_ATTENTION = 'Cliente esperando atencion',
  CUSTOMER_WAITING_ORDER = 'Client esperando pedido',
  CUSTOMER_EATING = 'Cliente comiendo',
  CUSTOMER_PAYING = 'Cliente pagando',
  CLOSED = 'Cerrada',
}

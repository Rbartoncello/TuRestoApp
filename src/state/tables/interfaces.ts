export interface Table {
  id: string;
  clientId: string;
  state: TABLE_STATES;
}

export enum TABLE_STATES {
  EMPTY = 'Vacia',
  CUSTOMER_WAITING_ATTENTION = 'Cliente esperando atencion',
  CUSTOMER_WAITING_ORDER = 'Client esperando pedido',
  CUSTOMER_EATING = 'Cliente comiendo',
  CUSTOMER_PAYING = 'Cliente pagando',
  CLOSED = 'Cerrada',
}

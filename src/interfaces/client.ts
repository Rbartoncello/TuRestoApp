export interface User {
  id: string | number;
  dni: string | number;
  lastname: string;
  name: string;
  email: string;
  password: string;
  rol: ROLES;
}

export enum CLIENT_STATES {
  PENDING_APPROVAL = 'Pendiente a aprobacion',
  REFUSED = 'Rechazado',
  ACCEPTED = 'Aprobado',
  SITTING = 'Sentado en la mesa',
  PAID = 'Cobrado',
}

export enum ROLES {
  CLIENT = 'Client',
  OWNER = 'Dueño',
  MAITRE = 'Maitre',
}

export interface Client extends User {
  idTable?: string | number;
  isUnknown: boolean;
  state: CLIENT_STATES;
}

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
  REFUSED = 'Rechadado',
  ACCEPTED = 'Aprobado',
}

export enum ROLES {
  CLIENT = 'cliente',
  OWNER = 'dueño',
  COOKER = 'cocinero',
  MAITRE = 'maitre',
}

export interface Client extends User {
  idTable?: string | number;
  isUnknown: boolean;
  state: CLIENT_STATES;
}

import {Status} from '../../types';

export type FormValues = {
  idNumber?: number;
  lastname: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginProps = {
  status: Status;
  onSubmit: (values: FormValues) => void;
};

export type StateProps = {
  status: Status;
};

export type DispatchProps = {
  onSubmit: () => {};
};

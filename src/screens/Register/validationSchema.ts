import {object, string} from 'yup';
import {
  EMAIL_FORMAT_MESSAGE,
  INCORRECT_ID_NUMBER_FORMAT_MESSAGE,
  MIN_DIGITS_ALLOWED_PASSWORD_MESSAGE,
  REQUIRED_MESSAGE,
} from '../../constans/messages.ts';

const validationSchema = object({
  idNumber: string()
    .min(8, INCORRECT_ID_NUMBER_FORMAT_MESSAGE)
    .max(8, INCORRECT_ID_NUMBER_FORMAT_MESSAGE)
    .required(REQUIRED_MESSAGE),
  lastname: string().required(REQUIRED_MESSAGE),
  name: string().required(REQUIRED_MESSAGE),
  email: string().email(EMAIL_FORMAT_MESSAGE).required(REQUIRED_MESSAGE),
  password: string()
    .min(6, MIN_DIGITS_ALLOWED_PASSWORD_MESSAGE)
    .max(20, MIN_DIGITS_ALLOWED_PASSWORD_MESSAGE)
    .required(REQUIRED_MESSAGE),
  passwordConfirm: string()
    .min(6, MIN_DIGITS_ALLOWED_PASSWORD_MESSAGE)
    .max(20, MIN_DIGITS_ALLOWED_PASSWORD_MESSAGE)
    .required(REQUIRED_MESSAGE),
});

 const validationAnonymusSchema= object({
  name: string().required(REQUIRED_MESSAGE)
});

export {validationSchema, validationAnonymusSchema};

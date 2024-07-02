import {useSessionStore} from './slice.ts';
import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from '../../services/firebase/FirebaseConfig.ts';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';
import firebase from 'firebase/compat';
import Routes from '../../navigation/routes.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';
import {useUsersActions} from '../users/actions.tsx';
import {INCORRECT_USERNAME_PASSWORD_MESSAGE} from '../../constans/messages.ts';
import {ref, uploadBytes} from 'firebase/storage';
import {CLIENT_STATES, ROLES, User} from '../users/interfaces.ts';
import {OneSignal} from 'react-native-onesignal';
import {sendNotification} from '../../services/Notifiaction';
import UserCredential = firebase.auth.UserCredential;

const auth = FIREBASE_AUTH;

export const useLogin = () => {
  const {setStatus, setToken, setUser} = useSessionStore.getState();
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();
  const {saveNewUser, getClient} = useUsersActions();

  const login = async (email: string, password: string) => {
    setStatus(getStartStatus());
    try {
      const user = (await getClient(email)) as User;

      if (user && user?.email === email && user.rol === ROLES.CLIENT) {
        if (user?.state === CLIENT_STATES.PENDING_APPROVAL) {
          throw {message: 'Cliente pendiente a aprobacion'};
        } else if (user?.state === CLIENT_STATES.REFUSED) {
          throw {message: 'Cliente rechadado por el dueño'};
        }
      }

      const response: UserCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      ).catch(() => {
        throw {message: INCORRECT_USERNAME_PASSWORD_MESSAGE};
      });

      setToken(response.user?.accessToken);
      setUser(user);
      OneSignal.login(user.rol);
      navigate(user.rol !== ROLES.CLIENT ? Routes.SELECTION : Routes.HOME);
      setStatus(getSuccessStatus());
    } catch (error) {
      setStatus(getErrorStatus(error?.message));
    }
  };

  const logout = async () => {
    setStatus(getStartStatus());
    try {
      await signOut(FIREBASE_AUTH);
      setStatus(getSuccessStatus());
      setToken('');
      setUser(undefined);
      navigate(Routes.LOGIN);
    } catch (error) {
      setStatus(getErrorStatus());
    }
  };

  const signUp = async (
    dni: string | number,
    lastname: string,
    name: string,
    email: string,
    password: string,
    image: string,
  ) => {
    setStatus(getStartStatus());
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await saveNewUser(dni, lastname, name, email, ROLES.CLIENT);
      await uploadImage(image, `clients/${email}`);
      await sendNotification(ROLES.OWNER, 'Se a reguistrado un nuevo cliente');
      setStatus(getSuccessStatus());
      navigate(Routes.LOGIN);
    } catch (e) {
      setStatus(getErrorStatus(e));
    }
  };

  const uploadImage = async (image: string, path: string) => {
    try {
      const storageRef = ref(FIREBASE_STORAGE, path);

      const response = await fetch(image);
      const blob = await response.blob();
      uploadBytes(storageRef, blob).then(res => console.log(res));
    } catch (e) {
      console.error(e);
      setStatus(getErrorStatus());
    }
  };

  return {login, logout, signUp};
};

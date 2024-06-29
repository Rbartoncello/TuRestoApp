import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {doc, setDoc, getDoc, collection, getDocs} from 'firebase/firestore';
import {CLIENT_STATES, ROLES, Client, User} from './interfaces.ts';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';
import {useUsersStore} from './slice.ts';

export const useUsersActions = () => {
  const {setStatus, setUsers} = useUsersStore();
  const saveNewUser = async (
    dni: string | number,
    lastname: string,
    name: string,
    email: string,
    rol: ROLES,
  ) => {
    try {
      await setDoc(doc(FIREBASE_DB, 'clients', `${email}`), {
        id: `${new Date().getTime()}`,
        dni,
        lastname,
        name,
        email,
        rol,
        isUnknown: false,
        state: CLIENT_STATES.PENDING_APPROVAL,
      });
    } catch (error) {
      throw error;
    }
  };

  const getClient = async (id: string): Promise<Client | {}> => {
    try {
      const docRef = doc(FIREBASE_DB, 'clients', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return {};
      }

      const data = docSnap.data();

      if (data && typeof data === 'object') {
        return data as Client;
      }
      return {};
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    setStatus(getStartStatus());
    try {
      const collectionRef = collection(FIREBASE_DB, 'clients');
      const querySnapshot = await getDocs(collectionRef);

      const response = querySnapshot.docs.map(data => data.data()) as User[];

      setStatus(getSuccessStatus());
      setUsers(response || []);
    } catch (error) {
      setStatus(getErrorStatus(error));
      throw error;
    }
  };

  return {saveNewUser, getClient, getUsers};
};

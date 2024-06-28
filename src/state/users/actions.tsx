import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {Client, CLIENT_STATES} from '../../interfaces/client.ts';

export const useUsersActions = () => {
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

  return {saveNewUser, getClient};
};

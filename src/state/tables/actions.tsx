import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {doc, collection, getDocs, updateDoc} from 'firebase/firestore';
import {Table} from './interfaces.ts';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory.ts';
import {useTablesStore} from './slice.ts';

export const useTablesActions = () => {
  const {setStatus, setTables, tables} = useTablesStore();

  const getTables = async () => {
    setStatus(getStartStatus());
    try {
      const collectionRef = collection(FIREBASE_DB, 'tables');
      const querySnapshot = await getDocs(collectionRef);

      const response = querySnapshot.docs.map(data => data.data()) as Table[];

      setStatus(getSuccessStatus());
      setTables(response || []);
    } catch (error) {
      setStatus(getErrorStatus(error));
      throw error;
    }
  };

  const uploadTable = async (table: Table) => {
    setStatus(getStartStatus());
    try {
      const clientRef = doc(FIREBASE_DB, 'tables', table.id);
      await updateDoc(clientRef, table);

      setStatus(getSuccessStatus());
      setTables(
        tables.map(u => {
          if (table.id === u.id) {
            return table;
          }
          return u;
        }) || [],
      );
    } catch (error) {
      setStatus(getErrorStatus(error));
      throw error;
    }
  };

  return {getTables, uploadTable};
};

import {FC, useEffect, useState} from 'react';
import type {HomeScreenProps} from './types';
import {Container, Text} from '../../components';
import {useBoolean} from '../../hooks';
import {useSessionStore} from '../../state/session/slice.ts';
import {TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import colors from '../../theme/base/colors.ts';
import Modal from '../../components/Modal';
import {FIREBASE_DB} from '../../services/firebase/FirebaseConfig.ts';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  writeBatch,
} from 'firebase/firestore';

export interface Response {
  qr: Points;
  user: string;
  points: number;
}

const enum Points {
  HUNDRED = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f',
  FIFTY = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
  TEN = '8c95def646b6127282ed50454b73240300dccabc',
}

interface Options {
  HUNDRED: {key: Points; loaded: boolean; times: number};
  FIFTY: {key: Points; loaded: boolean; times: number};
  TEN: {key: Points; loaded: boolean; times: number};
}

const options: Options = {
  HUNDRED: {key: Points.HUNDRED, loaded: false, times: 0},
  FIFTY: {key: Points.FIFTY, loaded: false, times: 0},
  TEN: {key: Points.TEN, loaded: false, times: 0},
};

const initialMessage = 'Se ha escanedado el QR satisfacriamente';

const HomeScreen: FC<HomeScreenProps> = () => {
  const {user} = useSessionStore();
  const [active, setActive] = useBoolean(false);
  const [data, setData] = useState<string>('');
  const [open, setOpen] = useBoolean(false);
  const [credit, setCredit] = useState(0);
  const [record, setRecord] = useState<Options>(options);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    getPoints();
  }, []);

  const savePoint = async (info: string, points: number) => {
    try {
      await setDoc(doc(FIREBASE_DB, 'points', `${new Date().getTime()}`), {
        user: user?.email,
        qr: info,
        points: points,
      });
      console.info('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data to Firestore: ', error);
      console.error('Failed to save data.');
    }
  };

  const getPoints = async () => {
    try {
      const collectionRef = collection(FIREBASE_DB, 'points');
      const querySnapshot = await getDocs(collectionRef);
      let response: Response[] = [];
      querySnapshot.forEach(doc => {
        response.push(doc.data() as Response);
      });
      const responseFiltered = response.filter(res => res.user === user?.email);

      const totalPoints = responseFiltered.reduce(
        (previousValue, current) => previousValue + current.points,
        0,
      );
      setCredit(totalPoints);

      responseFiltered.map(res => {
        if (res.qr === record.HUNDRED.key) {
          setRecord(prevState => ({
            ...prevState,
            HUNDRED: {
              ...prevState.HUNDRED,
              loaded: true,
              times: prevState.HUNDRED.times + 1,
            },
          }));
        } else if (res.qr === record.TEN.key) {
          setRecord(prevState => ({
            ...prevState,
            TEN: {
              ...prevState.TEN,
              loaded: true,
              times: prevState.TEN.times + 1,
            },
          }));
        } else {
          setRecord(prevState => ({
            ...prevState,
            FIFTY: {
              ...prevState.FIFTY,
              loaded: true,
              times: prevState.FIFTY.times + 1,
            },
          }));
        }
      });
      console.log({responseFiltered});
    } catch (error) {
      console.error('Error al obtener información de la base de datos:', error);
    }
  };

  const getAllPoints = async () => {
    try {
      const collectionRef = collection(FIREBASE_DB, 'points');
      const querySnapshot = await getDocs(collectionRef);
      let response = [];
      querySnapshot.forEach(doc => {
        response.push({...doc.data()});
      });
      return response;
    } catch (error) {
      console.error('Error al obtener información de la base de datos:', error);
      return [];
    }
  };

  // Función para borrar puntos
  const deletePoints = async () => {
    try {
      const collectionRef = collection(FIREBASE_DB, 'points');
      const snapshot = await getDocs(collectionRef);

      const batch = writeBatch(FIREBASE_DB);
      snapshot.forEach(docSnapshot => {
        batch.delete(docSnapshot.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error al borrar puntos de la base de datos:', error);
    }
  };

  // Función para limpiar y reinsertar puntos
  const clearPoints = async () => {
    try {
      const allPoints = await getAllPoints();

      // Filtrar los puntos que no pertenecen al usuario actual
      const filteredPoints = allPoints.filter(
        point => point.user !== user?.email,
      );

      // Paso 1: Borrar todos los documentos de la colección
      await deletePoints();
      console.info('All documents deleted successfully.');

      // Paso 2: Reinsertar los documentos filtrados
      const batch = writeBatch(FIREBASE_DB);
      const collectionRef = collection(FIREBASE_DB, 'points');

      filteredPoints.forEach(point => {
        const docRef = doc(collectionRef); // Crear un nuevo documento con ID autogenerado
        batch.set(docRef, point);
      });

      await batch.commit();
      console.info('Data reinserted successfully!');
      getPoints();
    } catch (error) {
      console.error('Error updating points collection: ', error);
      console.error('Failed to update collection.');
    }
  };

  const handleScanQR = (qrData: string) => {
    setActive.off();

    switch (qrData) {
      case Points.HUNDRED:
        console.log(record.HUNDRED);
        console.log(
          !record.HUNDRED.loaded ||
            (user?.rol === 'admin' && record.HUNDRED.times < 2),
        );
        if (
          !record.HUNDRED.loaded ||
          (user?.rol === 'admin' && record.HUNDRED.times < 2)
        ) {
          console.log('hola', record.HUNDRED);
          setRecord({
            ...record,
            HUNDRED: {
              ...record.HUNDRED,
              loaded: true,
              times: user?.rol === 'admin' && record.HUNDRED.loaded ? 2 : 1,
            },
          });
          setData('100');
          setCredit(credit + 100);
          savePoint(qrData, 100);
          setMessage(initialMessage);
        } else {
          setMessage('Codigo ya escanedado');
        }
        break;
      case Points.TEN:
        if (
          !record.TEN.loaded ||
          (user?.rol === 'admin' && record.TEN.times < 2)
        ) {
          setRecord({
            ...record,
            TEN: {
              ...record.TEN,
              loaded: true,
              times: record.TEN.loaded ? 2 : 1,
            },
          });
          setData('10');
          setCredit(credit + 10);
          savePoint(qrData, 10);
          setMessage(initialMessage);
        } else {
          setMessage('Codigo ya escanedado');
        }
        break;
      default:
        if (
          !record.FIFTY.loaded ||
          (user?.rol === 'admin' && record.FIFTY.times < 2)
        ) {
          setRecord({
            ...record,
            FIFTY: {
              ...record.FIFTY,
              loaded: true,
              times: user?.rol === 'admin' && record.FIFTY.loaded ? 2 : 1,
            },
          });
          setData('50');
          setCredit(credit + 50);
          savePoint(qrData, 50);
          setMessage(initialMessage);
        } else {
          setMessage('Codigo ya escanedado');
        }
        break;
    }
    setOpen.on();
  };

  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brandPrimary,
      }}>
      {open ? (
        <Modal
          active={open}
          setActive={setOpen}
          onConfirm={setOpen.off}
          title={message}
        />
      ) : undefined}
      {!active ? (
        <View>
          <TouchableOpacity
            onPress={setActive.on}
            style={{
              borderWidth: 3,
              justifyContent: 'center',
              alignItems: 'center',
              width: 250,
              height: 250,
              borderRadius: 20,
              backgroundColor: colors.brandSecondary,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 50,
                flexWrap: 'wrap',
                textAlign: 'center',
              }}>
              Escanear QR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setCredit(0);
              setRecord(options);
              await clearPoints().then(() => setCredit(0));
            }}
            style={{
              marginTop: 10,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.error,
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              Borrar creditos
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <QRCodeScanner
          containerStyle={{
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          cameraContainerStyle={{
            borderWidth: 1,
            borderColor: 'red',
            width: 300,
          }}
          cameraStyle={{
            borderWidth: 1,
            borderColor: 'green',
            width: 300,
          }}
          onRead={date => {
            handleScanQR(date.data);
          }}
          reactivate={true}
          reactivateTimeout={500}
          showMarker={true}
        />
      )}
      <View style={{position: 'absolute', bottom: 25}}>
        <Text style={{fontSize: 50, fontWeight: '800'}}>
          Creditos: {credit}
        </Text>
      </View>
    </Container>
  );
};

export default HomeScreen;

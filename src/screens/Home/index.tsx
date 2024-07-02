import React, {FC, useState} from 'react';
import type {HomeScreenProps} from './types';
import {Container, LoadingOverlay, Text} from '../../components';
import {useBoolean} from '../../hooks';
import {TouchableOpacity, View} from 'react-native';
import QRScanner from '../../components/QRScanner';
import styles from './styles.ts';
import {BarCodeReadEvent} from 'react-native-camera';
import {useSessionStore} from '../../state/session/slice.ts';
import Modal from '../../components/Modal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/routes.ts';
import {RootStackParams} from '../../navigation/StackNavigation.tsx';

const HomeScreen: FC<HomeScreenProps> = () => {
  const [active, setActive] = useBoolean(false);
  const [data, setData] = useState<{id: number; key: string}>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useBoolean(false);
  const {user} = useSessionStore();
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();

  const fetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const json: {id: number; key: string} = await response.json();
      setData(json);
      setIsLoading(false);
      if (json.id.toString() === user?.idTable) {
        navigate(Routes.MENU_LIST);
      }
      setOpen.on();
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleScanQR = async (e: BarCodeReadEvent) => {
    await fetchData(e.data);
    setActive.off();
  };

  return (
    <Container style={styles.root}>
      {isLoading && <LoadingOverlay />}
      {!active ? (
        <View>
          <TouchableOpacity
            onPress={setActive.on}
            style={styles.buttonContainer}>
            <Text style={styles.textButton}>Escanear QR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{backgroundColor: 'green', left: -170, bottom: -350}}>
          <QRScanner
            onRead={handleScanQR}
            reactivate={true}
            reactivateTimeout={500}
            showMarker={true}
            active={active}
          />
        </View>
      )}
      <Modal
        active={open}
        setActive={setOpen}
        onConfirm={() => {
          setOpen.off();
          setActive.on();
        }}
        title={'No es tu mesa'}
        message={`Esta es la mesa ${data?.id} y usted tiene asignada la mesa ${user?.idTable}, Por favor dirijase hacia la mesa en cuestion`}
      />
    </Container>
  );
};

export default HomeScreen;

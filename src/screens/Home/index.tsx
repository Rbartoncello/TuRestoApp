import React, {FC} from 'react';
import type {HomeScreenProps} from './types';
import {Container, Text} from '../../components';
import {useBoolean} from '../../hooks';
import {TouchableOpacity, View} from 'react-native';
import QRScanner from '../../components/QRScanner';
import styles from './styles.ts';

const HomeScreen: FC<HomeScreenProps> = () => {
  const [active, setActive] = useBoolean(false);

  const handleScanQR = (qrData?: string) => {
    setActive.off();

    console.log(qrData);
  };

  return (
    <Container style={styles.root}>
      {!active ? (
        <View>
          <TouchableOpacity
            onPress={setActive.on}
            style={styles.buttonContainer}>
            <Text style={styles.textButton}>Escanear QR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <QRScanner
          onRead={e => handleScanQR(e.data)}
          reactivate={true}
          reactivateTimeout={500}
          showMarker={true}
        />
      )}
    </Container>
  );
};

export default HomeScreen;

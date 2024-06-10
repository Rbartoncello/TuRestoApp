import {FC} from 'react';
import type {HomeScreenProps} from './types';
import {Container, Text} from '../../components';
import {useBoolean} from '../../hooks';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../theme/base/colors.ts';
import QRScanner from '../../components/QRScanner';

const HomeScreen: FC<HomeScreenProps> = () => {
  const [active, setActive] = useBoolean(false);

  const handleScanQR = (qrData?: string) => {
    setActive.off();

    console.log(qrData);
  };

  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brandPrimary,
      }}>
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

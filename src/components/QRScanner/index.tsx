import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';

interface QRScannerProp extends RNQRCodeScannerProps {
  active: boolean;
}

const QRScanner: FC<QRScannerProp> = ({active, ...props}) => {
  return (
    <View style={styles.root}>
      {active && (
        <QRCodeScanner
          {...props}
          containerStyle={styles.container}
          cameraContainerStyle={styles.camaraContainer}
          cameraStyle={styles.camara}
        />
      )}
    </View>
  );
};

export default QRScanner;

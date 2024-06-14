import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';

interface QRScannerProp extends RNQRCodeScannerProps {}

const QRScanner: FC<QRScannerProp> = ({...props}) => {
  return (
    <View style={styles.root}>
      <QRCodeScanner
        {...props}
        containerStyle={styles.container}
        cameraContainerStyle={styles.camaraContainer}
        cameraStyle={styles.camara}
      />
    </View>
  );
};

export default QRScanner;

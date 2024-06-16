import {View} from 'react-native';
import React from 'react';
import styles from './ErrorInputMessage.styles';
import {ErrorInputMessageProps} from './interfaces';
import {AlertCircleIcon} from '../../assets/icons';
import colors from '../../theme/colors';
import Text from '../Text';

const ErrorInputMessage: React.FC<ErrorInputMessageProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <AlertCircleIcon width={16} height={16} color={colors.red_500} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorInputMessage;

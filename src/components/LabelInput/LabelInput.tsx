import {View} from 'react-native';
import React, {FC} from 'react';
import styles from './LabelInput.styles';
import {LabelInputProps} from './interfaces';
import Text from '../Text';

const LabelInput: FC<LabelInputProps> = ({
  label,
  required = false,
  ...props
}) => {
  return (
    <View style={styles.root}>
      <Text {...props} style={styles.text}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
    </View>
  );
};

export default LabelInput;

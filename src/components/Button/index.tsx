import type {ButtonProps as RNEButtonProps} from '@rneui/base';
import {Button as ButtonRNE} from '@rneui/base';
import React, {FC} from 'react';
import styles from './styles.ts';

interface ButtonProps extends RNEButtonProps {
  title?: string;
  onPress?: () => void;
}

const Button: FC<ButtonProps> = ({title, onPress, ...props}) => {
  return (
    <ButtonRNE
      buttonStyle={styles.buttonSolid}
      titleStyle={styles.title}
      title={title}
      onPress={onPress}
      {...props}
    />
  );
};

export default Button;

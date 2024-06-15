import React from 'react';
import {Text as BaseText} from '@rneui/base';
import {StyleProp, TextInputProps, TextStyle} from 'react-native';
import {FCC} from '../../types';

export type Sizes = 'sm' | 'md' | 'lg' | 'xl';

interface TextProps extends TextInputProps {
  accessibilityLabel?: string;
  bold?: boolean;
  size?: Sizes;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const Text: FCC<TextProps> = ({...props}) => {
  return <BaseText {...props} />;
};

export default Text;

import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {createStyles} from './styles';
import {FCC} from '../../types';
import Text from '../Text';
import {useThemedStyles} from '../../hooks';

type TitleProps = {
  style?: StyleProp<TextStyle>;
};

const Title: FCC<TitleProps> = ({style, ...props}) => {
  const [styles] = useThemedStyles(createStyles);
  return <Text style={[style, styles.title]} size="lg" bold {...props} />;
};

export default Title;

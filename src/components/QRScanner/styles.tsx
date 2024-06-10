import {StyleSheet} from 'react-native';
import colors from '../../theme/base/colors.ts';

export default StyleSheet.create({
  root: {},
  container: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camaraContainer: {
    borderWidth: 1,
    borderColor: colors.error,
    width: 300,
  },
  camara: {
    borderWidth: 1,
    borderColor: colors.brandGreen,
    width: 300,
  },
});

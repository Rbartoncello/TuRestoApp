import {StyleSheet} from 'react-native';
import colors from '../../theme/base/colors.ts';
import {height, width} from '../../utils/scaling.ts';

export default StyleSheet.create({
  root: {},
  container: {
    position: 'absolute',
    bottom: 0,
    height: height,
    width: width,
    left: -10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
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

import {StyleSheet} from 'react-native';
import colors from '../../theme/base/colors.ts';

export default StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandPrimary,
  },
  buttonContainer: {
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    borderRadius: 20,
    backgroundColor: colors.brandSecondary,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 50,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

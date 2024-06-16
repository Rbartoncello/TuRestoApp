import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

export default StyleSheet.create({
  root: {},
  text: {
    color: colors.gray_500,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_400,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  required: {
    color: colors.red_500,
  },
});

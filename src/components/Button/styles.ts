import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

export default StyleSheet.create({
  buttonSolid: {
    borderRadius: 10,
    backgroundColor: colors.blue_500,
    paddingBottom: 12,
  },
  title: {
    color: colors.white,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  titleSolid: {
    color: colors.white,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  titleClear: {
    color: colors.blue_500,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  buttonClear: {
    backgroundColor: 'transparent',
    gap: 10,
  },
});

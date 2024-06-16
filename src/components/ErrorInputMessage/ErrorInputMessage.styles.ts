import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 17,
    paddingVertical: 0,
    paddingLeft: 32,
    marginTop: 4,
    marginBottom: 16,
  },
  text: {
    color: colors.red_500,
    fontSize: 12,
    marginLeft: 4,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_400,
  },
});

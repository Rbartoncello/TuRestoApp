import theme from '../../theme/base';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  focusedInput: {
    borderColor: theme.colors.brandPrimary,
  },
  label: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.brandDark,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.7,
    backgroundColor: theme.colors.disabled,
  },
  error: {
    height: 0,
    margin: 0,
    padding: 0,
  },
  errorInput: {
    borderColor: theme.colors.error,
    height: 0,
    margin: 0,
    padding: 0,
  },
});

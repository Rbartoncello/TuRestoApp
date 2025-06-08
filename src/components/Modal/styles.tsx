import theme from '../../theme/base';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.marginVertical,
  },
  modal: {
    borderWidth: 3,
    borderColor: theme.colors.error,
  },
  confirm: {
    backgroundColor: theme.colors.brandGreen,
  },
  containerConfirm: {
    marginLeft: -theme.spacing.marginHorizontal,
    marginRight: theme.spacing.marginHorizontal / 2,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: theme.spacing.paddingVertical,
  },
});

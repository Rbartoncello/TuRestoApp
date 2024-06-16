import theme from '../../theme/base';
import {StyleSheet} from 'react-native';
import colors from '../../theme/colors.ts';

export const createTitleStyles = () => ({
  text: {
    width: '100%',
    marginBottom: theme.spacing.marginVertical / 2,
    paddingHorizontal: theme.spacing.paddingHorizontal,
    fontSize: theme.typography.large.fontSize,
    color: theme.colors.brandDark,
    fontWeight: 'bold',
  },
});

export const createErrorFeedbackStyles = () => ({
  text: {
    paddingVertical: theme.spacing.paddingVertical * 2,
    color: theme.colors.error,
  },
});

export const createInputStyles = () =>
  StyleSheet.create({
    label: {
      marginVertical: 2,
      fontWeight: 'bold',
      color: theme.colors.black,
      fontSize: theme.typography.regular.fontSize,
      paddingBottom: theme.spacing.paddingVertical / 2,
    },
    container: {
      borderWidth: 1,
      borderColor: colors.gray_100,
      borderRadius: 8,
      paddingLeft: 4,
      marginBottom: 16,
    },
  });

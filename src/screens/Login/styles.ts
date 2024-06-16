import theme from '../../theme/base';
import colors from '../../theme/base/colors.ts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 240,
  },
  content: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    height: 250,
    borderRadius: 25,
    marginBottom: 120,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  buttonContainer: {
    marginBottom: theme.spacing.marginVertical,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.brandPrimary,
    height: 60,
  },
  buttonSignup: {
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 2,
    height: 60,
  },
  titleButton: {
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonAutoComplete: {
    backgroundColor: colors.brandSecondary,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '100',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.marginVertical * 2,
  },
  speedDial: {
    flex: 1,
    top: -200,
    marginBottom: 80,
    elevation: 10,
  },
});

import {StyleSheet} from 'react-native';
import theme from '../../theme/base';
import colors from '../../theme/colors.ts';
import typography from '../../theme/typography.ts';

export default StyleSheet.create({
  content: {
    flex: 1,
    minHeight: 240,
  },
  formContent: {
    backgroundColor: 'white',
    flex: 1,
    minHeight: 240,
    paddingTop: 10,
    borderRadius: 20,
    elevation: 10,
  },
  imageProfileContainer: {
    width: 100,
    height: 100,
    borderColor: colors.gray_200,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
  },
  button: {
    marginBottom: theme.spacing.marginVertical,
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '100',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconLeft: {
    marginHorizontal: 8,
  },
  qrButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: colors.white,
    elevation: 10,
  },
  qrButtonContainer: {
    alignItems: 'center',
  },
  text: {
    color: colors.gray_500,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_400,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'center',
  },
});

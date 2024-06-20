import {StyleSheet} from 'react-native';
import colors from '../../theme/colors.ts';
import typography from '../../theme/typography.ts';
import {width} from '../../utils/scaling.ts';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    color: colors.orange_500,
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  subtitle: {
    color: colors.gray_500,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  menuContainer: {
    flex: 1,
    padding: 5,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.white,
    elevation: 10,
  },
  menuTitle: {
    marginLeft: 15,
  },
  flatListContainer: {
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  itemContent: {
    justifyContent: 'space-between',
    height: 170,
    width: '50%',
  },
  itemImage: {
    resizeMode: 'center',
    width: 170,
    height: 170,
  },
  itemName: {
    color: colors.black,
    fontWeight: '800',
    fontSize: 18,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  itemDescription: {
    color: colors.gray_500,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
  },
  itemPrice: {
    color: colors.black,
    fontFamily: typography.fontFamily.Plus_Jakarta_Sans_600,
    textAlign: 'right',
    maxWidth: width / 2,
    fontWeight: '800',
    fontSize: 18,
  },
});

import {StyleSheet} from 'react-native';
import {width} from '../../utils/scaling.ts';
import colors from '../../theme/colors.ts';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageContainer: {
    height: width,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: colors.gray_100,
    elevation: 10,
  },
  flatListContent: {},
  flatListTouchable: {},
  image: {
    resizeMode: 'center',
    width: width,
    height: width,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  detailsTitle: {
    marginBottom: 5,
  },
  detailsTitleText: {
    fontSize: 20,
    fontWeight: '800',
  },
  detailsDescription: {
    padding: 5,
  },
  priceTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    elevation: 10,
    backgroundColor: colors.white,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: '800',
  },
  footerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
  },
  counterContainer: {
    width: '30%',
    borderWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  counterText: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  addButton: {
    width: '65%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.orange_400,
  },
  addButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
  },
});

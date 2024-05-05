import {StyleSheet} from 'react-native';
import {customPadding} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';

export const dashboardStyles = StyleSheet.create({
  headerContainer: {...customPadding(12, 20, 12, 20)},
  bodyContainer: {
    flex: 1,
    ...customPadding(24, 20, 24, 20),
    backgroundColor: colors.gray8,
    gap: 32,
  },
  cardWrp: {gap: 12},
  cardBody: {
    gap: 12,
    borderRadius: 8,
    elevation: 0.5,
    backgroundColor: colors.white,
    padding: 12,
  },
  cardHeader: {
    gap: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderRight: {flexDirection: 'row', gap: 8},
  cardHeaderRightAlt: {gap: 2},
  cardHeaderAltText: {...typographies.bodySmallBold, color: colors.gray4},
  dropdownAlt: {alignItems: 'flex-start'},
  pipelineBody: {height: 'auto'}, //248
  taskBody: {height: 60},
  pipelineFooter: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...customPadding(20, 20, 20, 20),
  },
  taskFooter: {gap: 4, ...customPadding(20, 20, 20, 20)},
  bottomSheet: {
    ...customPadding(10, 20, 10, 20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealBtn: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {stageCardS} from '../interface/styles';
import {
  getHexaOpacityColorCode,
  twoColorCompare,
} from '../../../utilities/helper.utility';

const stageStyles = StyleSheet.create({
  header: {...customPadding(12, 20, 12, 20)},
  flex0: {flex: 0},
  reportWrp: {gap: 2, ...customPadding(8, 20, 20, 20)},
  filterWrp: {flexDirection: 'row', gap: 8, ...customPadding(12, 0, 12, 0)},
  filterLabel: {...typographies.bodyMediumBold, color: colors.gray4},
  filterLabelValue: {...typographies.bodyMediumBold, color: colors.gray0},
  reportBody: {
    gap: 20,
    padding: 20,
    borderRadius: 8,
    borderColor: colors.gray8,
    borderWidth: 1,
  },
  dealValue: {...typographies.headingLarge, color: colors.primary},
  valueWrp: {gap: 32, flexDirection: 'row'},
  valueStatsTitle: {...typographies.bodySmall, color: colors.gray4},
  flatListStyle: {gap: 12, paddingHorizontal: 20},
});
const generateColor = (color1: string, color2: string) => {
  const isSimilar = twoColorCompare(color1, color2);
  return isSimilar
    ? twoColorCompare(color2, colors.gray8)
      ? colors.success2
      : colors.gray8
    : color2;
};
const stageCardStyles = ({
  bgColor = colors.primary,
  textColor = colors.white,
}: stageCardS) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: generateColor(textColor, bgColor),
    },
    headerWrp: {
      ...customPadding(10, 8, 12, 16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: generateColor(textColor, bgColor),
    },
    headerText: {...typographies.bodyMediumBold, color: textColor},
    headerPercentage: {
      ...typographies.labelLarge,
      color: textColor,
      padding: 2,
      borderRadius: 100,
      ...customPadding(2, 6, 2, 6),
      backgroundColor: getHexaOpacityColorCode(textColor, 0.3),
      alignSelf: 'flex-start',
    },
    actionWrp: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      ...customPadding(4, 0, 4, 0),
    },
    contactWrp: {
      gap: 12,
      ...customPadding(20, 0, 24, 0),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactList: {flexDirection: 'row'},
    contactAvatar: {
      height: 40,
      width: 40,
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: colors.gray8,
      backgroundColor: colors.gray9,
      ...typographies.bodySmallBold,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: colors.gray4,
      marginLeft: -10,
      textTransform: 'uppercase',
    },
    totalDeal: {
      ...typographies.bodySmall,
      color: colors.gray4,
      textAlign: 'center',
    },
  });

const stageDetailsStyles = ({
  bgColor = colors.primary,
  textColor = colors.white,
}: stageCardS) =>
  StyleSheet.create({
    headerWrp: {flexDirection: 'row', gap: 16, alignItems: 'center'},
    headerInfo: {
      gap: 4,
      backgroundColor: generateColor(textColor, bgColor),
      ...customPadding(0, 8, 20, 20),
    },
    headerTitle: {...typographies.headingLarge, color: textColor},
    headerSubInfo: {flexDirection: 'row', alignItems: 'center', gap: 6},
    textSubInfo: {...typographies.bodyMedium, color: textColor},
    dotDivider: {
      width: 2,
      height: 2,
      borderRadius: 50,
      backgroundColor: textColor,
    },
    textSubBg: {
      ...customPadding(2, 6, 2, 6),
      backgroundColor: getHexaOpacityColorCode(textColor, 0.3),
      borderRadius: 50,
    },
    tabWrp: {
      ...customPadding(8, 20, 8, 20),
      maxHeight: 54,
      backgroundColor: 'red',
    },
    container: {
      flexGrow: 1,
      backgroundColor: 'orange',
      gap: 2,
      ...customPadding(8, 0, 8, 0),
    },
  });

export {stageStyles, stageCardStyles, stageDetailsStyles, generateColor};

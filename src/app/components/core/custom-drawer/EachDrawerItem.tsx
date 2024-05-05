/* eslint-disable react-native/no-inline-styles */
import React, {FC, ReactElement} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {
  getHexaOpacityColorCode,
  validateBadgeValue,
} from '../../../utilities/helper.utility';
import CustomBadge from '../../app/CustomBadge.component';
import {customUseSelector} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';

interface props {
  onPress?: () => void;
  icon: ReactElement;
  title: string;
  isSelected?: boolean;
  hasBadge?: boolean;
}

const EachDrawerItem: FC<props> = ({
  icon,
  title,
  onPress,
  isSelected,
  hasBadge,
}) => {
  const {unreadCount: badgeValue} = customUseSelector(userStates);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected
          ? {
              backgroundColor: getHexaOpacityColorCode(
                colors.drawer.select,
                0.15,
              ),
            }
          : {},
      ]}
      onPress={onPress}
      activeOpacity={0.6}>
      <View>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badgeView}>
        {hasBadge && badgeValue?.toString() !== '0' && (
          <CustomBadge
            value={validateBadgeValue(badgeValue)}
            style={styles.badge}
            textStyle={{fontSize: 17}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default EachDrawerItem;

export const styles = StyleSheet.create({
  container: {
    ...customPadding(10, 16, 10, 16),
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {...typographies.bodyMediumBold, color: colors.drawer.text},
  badgeView: {flex: 1},
  badge: {
    alignSelf: 'flex-end',
    width: 40,
    position: 'relative',
    paddingTop: 2,
  },
});

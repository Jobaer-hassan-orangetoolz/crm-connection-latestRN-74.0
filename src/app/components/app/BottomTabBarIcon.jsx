import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import CustomBadge from './CustomBadge.component';

const BottomTabBarIcon = ({
  title,
  Icon,
  hasBadge = false,
  badgeValue = '0',
}) => {
  return (
    <View style={styles.cont}>
      {title === 'Add' ? (
        <View style={styles.addIcon}>
          <Icon height={16} width={16} fill={colors.white} />
        </View>
      ) : (
        <Icon fill={colors.tab.inactiveText} />
      )}

      <Text style={styles.label} numberOfLines={1}>
        {title}
      </Text>
      {hasBadge && badgeValue !== '0' && (
        <CustomBadge value={badgeValue} style={styles.badge} />
      )}
    </View>
  );
};

export default BottomTabBarIcon;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: rs(44),
  },
  label: {
    ...typographies.bodyXSBold,
    marginTop: rs(4),
  },
  addIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  badge: {
    left: 74,
    top: -10,
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
const CustomBadge = ({value = 0, style, textStyle}: any) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.badgeColor,
    borderRadius: 10,
    height: 22,
    width: 22,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typographies.bodyXSBold,
    color: colors.white,
  },
});

export default CustomBadge;

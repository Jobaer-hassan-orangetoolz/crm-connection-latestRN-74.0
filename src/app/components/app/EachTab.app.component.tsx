import React, {ReactElement} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {customPadding} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';

export interface homeTabProps {
  icon: ReactElement;
  title: string;
  onPress: () => void;
  iconStyle?: object;
}

const EachTab: React.FC<homeTabProps> = ({icon, title, onPress, iconStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrp}>
      <View style={iconStyle}>{icon}</View>
      <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default EachTab;

export const styles = StyleSheet.create({
  iconWrp: {
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...customPadding(0, 20, 0, 20),
  },
  iconText: {...typographies.bodyXSBold, textAlign: 'center'},
});

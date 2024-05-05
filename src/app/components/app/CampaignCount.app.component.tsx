import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';

const CampaignCount: React.FC<{
  icon: ReactElement;
  count: number | string;
  type: string;
  style?: ViewStyle;
}> = ({icon, count, type, style = {}}) => {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <View>
        <Text style={typographies.bodySmallBold}>{count}</Text>
        <Text style={[typographies.bodyXS, {color: colors.gray4}]}>{type}</Text>
      </View>
    </View>
  );
};

export default CampaignCount;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', gap: 8},
});

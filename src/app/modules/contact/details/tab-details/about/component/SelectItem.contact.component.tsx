import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CheckIcon from '../../../../../../assets/icons/Check.icon.asset';
import {
  customPadding,
  globalStyles,
} from '../../../../../../assets/styles/global.style.asset';
import {typographies} from '../../../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../../../assets/styles/colors.style.asset';

const SelectItem: React.FC<{
  text: string;
  onPress?: (params: any) => void;
  index?: number;
  check?: boolean;
}> = ({text, onPress = () => {}, index, check = false}) => {
  const handlePress = () => {
    onPress(index);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={styles.container}>
      <Text
        style={[
          typographies.bodyMediumBold,
          globalStyles.flexShrink1,
          styles.width,
        ]}
        numberOfLines={1}>
        {text}
      </Text>
      {check && <CheckIcon fill={colors.primary} />}
    </TouchableOpacity>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    ...customPadding(12, 20, 12, 20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  width: {width: '85%'},
});

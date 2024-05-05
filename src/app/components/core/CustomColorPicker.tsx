import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {customPadding} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';

const CustomColorPicker: React.FC = ({
  options = [],
  selected = null,
  onChange = () => {},
  name,
}: any) => {
  const foundSelected = useRef(false);
  const renderEachColor = () => {
    const list: any = [];
    options.map((item: any, index: any) => {
      if (selected === item.value) {
        foundSelected.current = true;
      }
      list.push(
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onChange(item.value, name);
            global.showBottomSheet({flag: false});
          }}
          style={[
            styles.each,
            {backgroundColor: item.value},
            item.hasBorder
              ? {...styles.border, borderColor: item.titleColor}
              : {},
          ]}
          key={index}>
          <Text style={[typographies.bodyMedium, {color: item.titleColor}]}>
            {item.title}
          </Text>
        </TouchableOpacity>,
      );
    });
    if (!foundSelected.current && selected) {
      list.push(
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onChange(selected)}
          style={[styles.each, {backgroundColor: selected}]}
          key={-1}>
          <Text
            style={[
              typographies.bodyMedium,
              {
                backgroundColor: colors.white,
              },
            ]}>
            {selected}
          </Text>
        </TouchableOpacity>,
      );
    }
    return list;
  };
  return <View style={styles.container}>{renderEachColor()}</View>;
};
export default CustomColorPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 7,
    padding: 20,
    flexWrap: 'wrap',
  },
  each: {
    ...customPadding(7, 14, 7, 14),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  border: {borderWidth: 1},
});

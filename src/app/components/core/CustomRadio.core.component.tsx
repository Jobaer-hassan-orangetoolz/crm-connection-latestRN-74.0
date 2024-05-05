/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {placeholders} from '../../assets/js/placeholders.message';
import RadioActive from '../../assets/icons/RadioActive.icon.asset';
import RadioInActive from '../../assets/icons/RadioInActive.icon.asset';

interface props {
  viewType?: 'inline' | 'block';
  wrpStyle?: any;
  optionStyle?: any;
  value?: any;
  options: Array<any>;
  valueField?: string;
  titleField?: string;
  onChange: Function;
}
interface optionsProps {
  optionStyle?: any;
  value?: any;
  valueField?: string;
  titleField?: string;
  onSelect: Function;
  item: any;
  formatOptions?: Function;
}

const EachOption = ({
  optionStyle = {},
  value = null,
  titleField = 'title', //FULL__DATA
  valueField = 'value', //FULL__DATA
  onSelect = () => {},
  item,
}: optionsProps) => {
  const isChecked = () => {
    let flag = false;
    if (valueField === 'FULL__DATA' && value === item) {
      flag = true;
    } else if (item[valueField] === value) {
      flag = true;
    }
    return flag;
  };
  const [isSelect, setIsSelect] = useState(false);
  useEffect(() => {
    setIsSelect(isChecked());
  }, [value]);
  const handleOnPress = () => {
    onSelect(
      isSelect ? null : valueField === 'FULL__DATA' ? item : item[valueField],
    );
    setIsSelect(!isSelect);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.optionWrp]}
      onPress={handleOnPress}>
      {isSelect ? <RadioActive /> : <RadioInActive />}
      <Text style={[styles.optionText, optionStyle]}>
        {titleField === 'FULL__DATA' ? item : item[titleField]}
      </Text>
    </TouchableOpacity>
  );
};

const CustomRadio = ({
  viewType = 'block',
  wrpStyle = {},
  options = [],
  optionStyle = {},
  titleField = 'title', //FULL__DATA
  valueField = 'value', //FULL__DATA
  value = null,
  onChange = () => {},
}: props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const handleOnClick = (selectedValue: any) => {
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };
  const renderOptions = () => {
    if (options.length === 0) {
      return (
        <Text style={globalStyles.noOptions}>{placeholders.noOptions}</Text>
      );
    }
    return options.map((item, index) => (
      <EachOption
        onSelect={handleOnClick}
        item={item}
        key={index}
        optionStyle={optionStyle}
        titleField={titleField}
        valueField={valueField}
        value={selectedOption}
      />
    ));
  };
  return (
    <View style={[globalStyles.flex1, (styles as any)[viewType], wrpStyle]}>
      {renderOptions()}
    </View>
  );
};
export default CustomRadio;

const styles = StyleSheet.create({
  inline: {flexDirection: 'row', gap: 12, flexWrap: 'wrap'},
  block: {gap: 12},
  optionWrp: {flexDirection: 'row', gap: 8, alignItems: 'center'},
  optionText: {...typographies.bodyMedium, textAlignVertical: 'center'},
});

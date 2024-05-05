import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {placeholders} from '../../assets/js/placeholders.message';
import CheckboxActive from '../../assets/icons/CheckboxActive.icon.asset';
import CheckboxInActive from '../../assets/icons/CheckboxInActive.icon.asset';
import {formatStringToArray} from '../../utilities/helper.utility';

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
    if (valueField === 'FULL__DATA' && value.includes(item)) {
      flag = true;
    } else if (item[valueField] === value.includes(item[valueField])) {
      flag = true;
    }
    return flag;
  };
  const [isSelect, setIsSelect] = useState(isChecked());
  const handleOnPress = () => {
    onSelect(valueField === 'FULL__DATA' ? item : item[valueField], !isSelect);
    setIsSelect(!isSelect);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.optionWrp]}
      onPress={handleOnPress}>
      {isSelect ? <CheckboxActive /> : <CheckboxInActive />}
      <Text style={[styles.optionText, optionStyle]}>
        {titleField === 'FULL__DATA' ? item : item[titleField]}
      </Text>
    </TouchableOpacity>
  );
};

const CustomCheckbox = ({
  viewType = 'block',
  wrpStyle = {},
  options = [],
  optionStyle = {},
  titleField = 'title', //FULL__DATA
  valueField = 'value', //FULL__DATA
  value = null,
  onChange = () => {},
}: props) => {
  const selectedOption = useRef([...formatStringToArray(value)]);
  const handleOnClick = (selectedValue: any, flag: boolean) => {
    if (flag) {
      selectedOption.current = [...selectedOption.current, selectedValue];
    } else {
      const index = selectedOption.current.indexOf(selectedValue);
      selectedOption.current.splice(index, 1);
    }
    onChange(selectedOption.current);
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
        value={selectedOption.current}
      />
    ));
  };
  return (
    <View style={[globalStyles.flex1, (styles as any)[viewType], wrpStyle]}>
      {renderOptions()}
    </View>
  );
};
export default CustomCheckbox;

const styles = StyleSheet.create({
  inline: {flexDirection: 'row', gap: 12, flexWrap: 'wrap'},
  block: {gap: 12},
  optionWrp: {flexDirection: 'row', gap: 8, alignItems: 'center'},
  optionText: {...typographies.bodyMedium, textAlignVertical: 'center'},
});

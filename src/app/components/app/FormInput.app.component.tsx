import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputLeftIcon from '../core/input/InputLeftIcon.core.component';
import {typographies} from '../../assets/styles/typographies.style.asset';

interface group {
  group?: boolean;
  list: any;
}

interface item {
  title: string;
  name: string;
  icon?: ReactElement | any;
  validationRules?: () => void;
  inputProps?: any;
  dropdown?: boolean;
}

interface props {
  item: group | item | any;
  onChangeHandler: (value: any, name: string) => void;
  values?: object | any;
  showMore?: boolean;
}

const FormInput: React.FC<props> = ({
  item,
  onChangeHandler,
  showMore = true,
  values = {},
}) => {
  if (item.group) {
    return null;
  }
  if (!showMore && !item.priority) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={typographies.bodyMediumBold}>{item.title}</Text>
      <InputLeftIcon
        icon={item.icon}
        name={item.name}
        onChangeText={onChangeHandler}
        validationRules={item.validationRules}
        inputProps={item.inputProps}
        defaultValue={values[item.name]}
      />
    </View>
  );
};
export default FormInput;

const styles = StyleSheet.create({
  container: {gap: 8, flexGrow: 1},
});

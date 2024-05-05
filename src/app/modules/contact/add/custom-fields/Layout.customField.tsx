import React from 'react';
import {Text, View} from 'react-native';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import CustomFieldModel from '../../../../services/models/CustomField.model';
import InputLeftIcon from '../../../../components/core/input/InputLeftIcon.core.component';
import {textInput} from '../../../../assets/styles/properties.asset';
import CustomDropdown from '../../../../components/core/CustomDropdown.core.component';
import Log from '../../../splash/Log.module';
import {buttons} from '../../../../assets/js/buttons.message';
import ClickableText from '../../../../components/core/ClickableText.core.component';
import CustomRadio from '../../../../components/core/CustomRadio.core.component';
import CustomCheckbox from '../../../../components/core/CustomCheckbox.core.component';
import {
  formatDate,
  formatStringToArray,
} from '../../../../utilities/helper.utility';
import MultiLineInput from '../../../../components/core/input/MultiLineInput.core.component';
import CustomDTPicker from '../../../../components/core/date-time/CustomDTPicker';
import {layoutStyles as styles} from '../styles/customfield.style';

interface props {
  label: string;
  value: string | any;
  onChange: (
    value: any,
    name?: any,
    validationRules?: boolean | any | undefined,
  ) => void;
  type: any;
  options?: any;
  tag?: any;
  onRemove?: Function;
  index?: any;
  Component?: any;
  showRemove?: boolean;
  placeholder?: string | null;
  onClose?: Function;
  disabled?: boolean;
}

const CustomFieldLayout = ({
  label,
  value,
  onChange: handleOnChange,
  type,
  options,
  tag,
  onRemove,
  index,
  Component = Log,
  showRemove = true,
  placeholder = '',
  onClose,
  disabled,
}: props) => {
  const onChange = (text: any, name: any) => {
    handleOnChange(text, name, index);
  };
  const handleOnRemove = () => onRemove(tag, index);
  const renderField = () => {
    switch (type) {
      case CustomFieldModel.TYPE_TEXT:
        return (
          <InputLeftIcon
            name={tag}
            placeholder={placeholder}
            onChangeText={onChange}
            defaultValue={value}
          />
        );
      case CustomFieldModel.TYPE_MULTILINE:
        return (
          <MultiLineInput
            name={tag}
            onChangeText={onChange}
            placeholder={placeholder}
            defaultValue={value}
          />
        );
      case CustomFieldModel.TYPE_NUMBER:
        return (
          <InputLeftIcon
            name={tag}
            onChangeText={onChange}
            defaultValue={value}
            placeholder={placeholder}
            inputProps={{
              keyboardType: textInput.keyboard.numberPad,
            }}
          />
        );
      case CustomFieldModel.TYPE_PHONE:
        return (
          <InputLeftIcon
            name={tag}
            placeholder={placeholder}
            onChangeText={onChange}
            defaultValue={value}
            inputProps={{
              keyboardType: textInput.keyboard.numberPad,
            }}
          />
        );
      case CustomFieldModel.TYPE_ZIP_CODE:
        return (
          <InputLeftIcon
            name={tag}
            placeholder={placeholder}
            onChangeText={onChange}
            defaultValue={value}
          />
        );
      case CustomFieldModel.TYPE_URL:
        return (
          <InputLeftIcon
            name={tag}
            placeholder={placeholder}
            onChangeText={onChange}
            defaultValue={value}
            inputProps={{
              keyboardType: textInput.keyboard.url,
            }}
          />
        );
      case CustomFieldModel.TYPE_DROPDOWN:
        return (
          <CustomDropdown
            text={value ?? placeholder}
            type={'inputWrp'}
            component={Component}
            onClose={onClose}
            disabled={disabled}
            componentProps={{
              onChange: handleOnChange,
              options: options,
              selected: value,
              name: tag,
            }}
          />
        );
      case CustomFieldModel.TYPE_RADIO:
        return (
          <CustomRadio
            onChange={() => {}}
            options={formatStringToArray(options)}
            value={null}
            titleField="FULL__DATA"
            valueField="FULL__DATA"
          />
        );
      case CustomFieldModel.TYPE_CHECK:
        return (
          <CustomCheckbox
            onChange={() => {}}
            options={formatStringToArray(options)}
            value={value}
            titleField="FULL__DATA"
            valueField="FULL__DATA"
          />
        );
      case CustomFieldModel.TYPE_DATE_TIME:
        return (
          <CustomDTPicker
            _onConfirm={() => {}}
            _onCancel={() => {}}
            value={value}
          />
        );
      case CustomFieldModel.TYPE_DATE:
        return (
          <CustomDTPicker
            _onConfirm={(option: any) => onChange(option, tag)}
            _onCancel={() => {}}
            value={value}
            text={
              value ? formatDate(value, 'MM/DD/YYYY', '', true) : placeholder
            }
            mode={'date'}
          />
        );
      case CustomFieldModel.TYPE_TIME:
        return (
          <CustomDTPicker
            _onConfirm={(option: any) => onChange(option, tag)}
            _onCancel={() => {}}
            value={value}
            mode={'time'}
            text={value ? formatDate(value, 'hh:mm A', '', true) : placeholder}
          />
        );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textWrp}>
        <Text style={typographies.bodyMediumBold}>{label}</Text>
        {showRemove && (
          <ClickableText
            onPress={handleOnRemove}
            text={buttons.remove}
            style={styles.remove}
          />
        )}
      </View>
      {renderField()}
    </View>
  );
};
export default CustomFieldLayout;

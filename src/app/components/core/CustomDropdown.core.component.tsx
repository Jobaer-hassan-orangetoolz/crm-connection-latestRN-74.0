import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DownAngleIcon from '../../assets/icons/DownAngle.icon.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {customPadding} from '../../assets/styles/global.style.asset';

const CustomDropdown = ({
  text = '',
  iconSize = 20,
  iconFill = colors.gray4,
  onOpen = () => {},
  onClose = () => {},
  type = 'textWrp',
  component = null,
  componentProps = {},
  bottomSheetProps = {},
  textStyles = {},
  containerStyles = {},
  disabled = false,
  disableIcon = false,
}: any) => {
  const [value, setValue] = useState<string>(
    componentProps?.options?.customFiled ? text : '',
  );
  const handleOnChange = (_text: string, name: string) => {
    if (componentProps?.options?.customFiled) {
      setValue(_text);
    }
    componentProps.onChange(_text, name);
  };
  const handleOnClick = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    global.showBottomSheet({
      flag: true,
      component: component,
      componentProps: {...componentProps, onChange: handleOnChange},
      bottomSheetProps: bottomSheetProps,
      onClose: onClose,
      onOpen: onOpen,
    });
  };
  return (
    <TouchableOpacity
      onPress={handleOnClick}
      activeOpacity={0.5}
      disabled={disabled}
      style={[styles.container, (styles as any)[type], containerStyles]}>
      <Text
        numberOfLines={1}
        style={[(styles as any)[type + 'Text'], textStyles]}>
        {componentProps?.options?.customFiled ? value : text}
      </Text>
      <View>
        {!disableIcon && (
          <DownAngleIcon height={iconSize} width={iconSize} fill={iconFill} />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CustomDropdown;

const styles = StyleSheet.create({
  container: {flexShrink: 1, flexDirection: 'row', alignItems: 'center'},
  textWrp: {alignSelf: 'flex-start', gap: 2},
  inputWrp: {
    borderWidth: 1,
    borderColor: colors.gray8,
    borderRadius: 8,
    ...customPadding(12, 16, 12, 16),
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray9,
  },
  textWrpText: {
    ...typographies.bodySmallBold,
    color: colors.gray4,
    flexShrink: 1,
  },
  inputWrpText: {
    ...typographies.bodyMedium,
    color: colors.gray4,
  },
});

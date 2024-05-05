import React, {useState} from 'react';
import {dateTime} from './interface';
import {CustomDateTimePickerModal} from '../../../packages/datetimePicker.package';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CalenderIcon from '../../../assets/icons/Calender.icon.asset';
import {userLocalTimezone} from '../../../services/models/_Timezone.modal';

const CustomDTPicker = ({
  _onConfirm = () => {},
  _onCancel = () => {},
  value = new Date(),
  extraProps = {},
  mode = 'datetime',
  type = 'inputWrp',
  text = 'dd/mm/yy',
  minimumDate = new Date(),
  timezone = userLocalTimezone.timezone,
}: dateTime) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOnClick = () => setIsVisible(true);
  return (
    <>
      <TouchableOpacity
        onPress={handleOnClick}
        activeOpacity={0.5}
        style={[styles.container, (styles as any)[type]]}>
        <Text style={(styles as any)[type + 'Text']}>{text}</Text>
        <View>
          <CalenderIcon height={20} width={20} fill={colors.gray0} />
        </View>
      </TouchableOpacity>
      <CustomDateTimePickerModal
        isVisible={isVisible}
        timeZoneName={timezone}
        mode={mode}
        onConfirm={selectedValue => {
          _onConfirm(selectedValue);
          setIsVisible(false);
        }}
        onCancel={() => {
          _onCancel();
          setIsVisible(false);
        }}
        date={value ? value : new Date()}
        is24Hour={false}
        minimumDate={minimumDate}
        datePickerModeAndroid={'calendar'}
        {...extraProps}
      />
    </>
  );
};
export default CustomDTPicker;

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
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
  textWrpText: {...typographies.bodySmallBold, color: colors.gray4},
  inputWrpText: {...typographies.bodyMedium, color: colors.gray4},
});

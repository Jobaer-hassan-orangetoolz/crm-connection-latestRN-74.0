import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomDropdown from '../../../components/core/CustomDropdown.core.component';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
const EmailActionField: React.FC<any> = ({
  title = 'From',
  value = 'No Recipient Selected',
  component,
  containerStyle,
  componentProps,
  disabled = false,
  disableIcon = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{`${title}:`}</Text>
      <CustomDropdown
        text={value}
        containerStyles={styles.dropDown}
        component={component}
        componentProps={componentProps}
        disabled={disabled}
        disableIcon={disableIcon}
      />
    </View>
  );
};
export default EmailActionField;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray8,
    ...customPadding(12, 0, 12, 0),
    flexShrink: 1,
  },
  text: {...typographies.bodySmallBold, color: colors.gray4},
  dropDown: {
    flex: 0,
  },
  input: {
    flex: 1,
    height: 10,
  },
});

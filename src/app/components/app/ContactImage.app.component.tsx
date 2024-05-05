import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../assets/styles/colors.style.asset';
import {getFirstCharAt} from '../../utilities/helper.utility';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';

const ContactImage: React.FC<{
  name: string;
  bg?: string;
  textColor?: string;
  size?: '40' | '52' | '34' | '120';
}> = ({name, bg, textColor, size = '40'}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={[
        styles[size],
        styles.contactIcon,
        {
          borderColor: textColor || colors.contact.border,
          backgroundColor: bg || colors.contact.background,
        },
      ]}>
      <Text
        style={[
          styles[`${size}Text`],
          {
            color: textColor || colors.contact.text,
          },
        ]}>
        {getFirstCharAt(name || '') || '#'}
      </Text>
    </TouchableOpacity>
  );
};

export default ContactImage;

const styles = StyleSheet.create({
  contactIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 500,
  },
  40: {
    width: rs(40),
    height: rs(40),
  },
  34: {
    width: rs(34),
    height: rs(34),
  },
  52: {
    width: rs(52),
    height: rs(52),
  },
  120: {
    width: rs(120),
    height: rs(120),
  },
  '34Text': {
    ...typographies.bodyXSBold,
  },
  '40Text': {
    ...typographies.bodySmallBold,
  },
  '52Text': {
    ...typographies.bodyMediumBold,
  },
  '120Text': {
    ...typographies.headingLarge,
  },
});

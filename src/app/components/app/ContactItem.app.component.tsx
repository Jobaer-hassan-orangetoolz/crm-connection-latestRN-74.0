import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../../assets/styles/colors.style.asset';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {contactInterface} from '../../services/formatter/contact.formatter';
import {customPadding} from '../../assets/styles/global.style.asset';
import ContactDetailsBottomSheet from '../../modules/contact/details/bottomSheet/ContactDetails.bottomSheet';
import ContactImage from './ContactImage.app.component';

const ContactItem: React.FC<{
  item: contactInterface;
  style?: ViewStyle;
  index?: number;
  contact?: boolean;
  campaign?: boolean;
  disabled?: boolean;
}> = ({
  item,
  style,
  contact = true,
  campaign = false,
  disabled = false,
  index = 0,
}) => {
  const {
    name = '',
    email = '',
    number = '',
    isBlock = 0,
    isUnsubscribe = 0,
  } = item;
  const handlePress = () => {
    Keyboard.dismiss();
    global.showBottomSheet({
      flag: true,
      component: ContactDetailsBottomSheet,
      componentProps: {item, index, campaign},
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.contactBtnInnerCont,
        contact && styles.mainContainer,
        {
          backgroundColor:
            isBlock || isUnsubscribe ? colors.gray9 : colors.transparent,
        },
        style,
      ]}>
      <ContactImage name={name} />
      <Text
        style={[typographies.bodyMediumBold, globalStyles.flexShrink1]}
        numberOfLines={1}>
        {name || email || number}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ContactItem);

const styles = StyleSheet.create({
  contactBtnInnerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  mainContainer: {
    ...customPadding(8, 20, 8, 20),
  },
});

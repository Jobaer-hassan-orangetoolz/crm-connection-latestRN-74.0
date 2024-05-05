import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';
import {SCREEN_WIDTH} from '../../../assets/js/core.data';
import ContactItem from '../../../components/app/ContactItem.app.component';
import CheckboxInActive from '../../../assets/icons/CheckboxInActive.icon.asset';
import {contactInterface} from '../../../services/formatter/contact.formatter';
import CheckboxActive from '../../../assets/icons/CheckboxActive.icon.asset';

const ContactAddRenderItem: React.FC<{
  item: contactInterface;
  contactIds: any;
  isCheck?: boolean;
}> = ({item, contactIds, isCheck = false}) => {
  const [check, setIsCheck] = useState<boolean>(isCheck);
  const handleCheck = () => {
    let ids = contactIds.current;
    if (ids.includes(item.id)) {
      ids = ids.filter((_item: any) => _item !== item.id);
    } else {
      ids.push(item.id);
    }
    contactIds.current = ids;
    setIsCheck(!check);
  };
  return (
    <View style={styles.container}>
      <ContactItem disabled={true} item={item} style={styles.item} />
      <TouchableOpacity
        onPress={handleCheck}
        activeOpacity={0.5}
        style={{...customPadding(5, 0, 5, 5)}}>
        {check ? <CheckboxActive /> : <CheckboxInActive />}
      </TouchableOpacity>
    </View>
  );
};

export default ContactAddRenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    ...customMargin(0, 20),
  },
  item: {
    ...customMargin(0, 0, 2),
    width: SCREEN_WIDTH * 0.85,
    flex: 0,
  },
});

import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  customMargin,
  customPadding,
} from '../../../../assets/styles/global.style.asset';
import IconWithTextHeader from '../../../../components/core/headers/IconWithTextHeader.app.component';
import {titles} from '../../../../assets/js/titles.message';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {contactMoreActionOptions} from '../../../../assets/js/dropdown.data';
import {contactBottomSheetStyles} from '../../styles/contactBottomSheet.styles';
import {useCustomNavigation} from '../../../../packages/navigation.package';
import {screens} from '../../../../routes/routeName.route';
import {contactInterface} from '../../../../services/formatter/contact.formatter';
import AddCampaignToContact from '../tab-details/add-contact/AddCampaignToContact.module';

const ContactMoreAction: React.FC<{item: contactInterface}> = ({item}) => {
  const styles = contactBottomSheetStyles;
  const navigation = useCustomNavigation<any>();
  const {contactId, id, name} = item;
  const handleAction = (actionIndex: number) => {
    global.showBottomSheet({flag: false});
    switch (actionIndex) {
      case 0:
        return navigation.navigate(screens.addTask as never, {
          contactInfo: item,
          contact: true,
        });
      case 1:
        return navigation.navigate(screens.addNote as never, {
          id: contactId || id,
          contact: true,
        });
      case 2:
        return navigation.navigate(screens.eachConversation as never, {
          id: contactId || id,
          name: name,
          number: item.number,
          isRead: 1,
          email: item.email,
        });
      case 3:
        return global.showBottomSheet({
          flag: true,
          component: AddCampaignToContact,
          componentProps: {contactId: contactId || id},
        });
      case 4:
        return navigation.navigate(screens.addDeal, {
          contactId: contactId || id,
          contactDetails: item,
        });
    }
  };
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <IconWithTextHeader
        text={titles.moreAction}
        controlLeftIcon={() => {
          global.showBottomSheet({
            flag: false,
          });
        }}
      />
      <View style={{...customMargin(4)}}>
        {contactMoreActionOptions.map((actionItem: any, itemIndex: number) => {
          const {Icon, text, fill} = actionItem || {};
          return (
            <TouchableOpacity
              onPress={() => {
                handleAction(itemIndex);
              }}
              key={itemIndex}
              activeOpacity={0.5}
              style={styles.moreActionIconCont}>
              <View style={{...customPadding(2, 2, 2, 2)}}>
                <Icon fill={fill} />
              </View>
              <Text style={typographies.bodyMediumBold}>{text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ContactMoreAction;

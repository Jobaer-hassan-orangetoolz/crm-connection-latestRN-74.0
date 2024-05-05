import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import EditIcon from '../../../../assets/icons/Edit.icon.asset';
import DeleteIcon from '../../../../assets/icons/Delete.icon.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import CustomButtonWithIcon from '../../../../components/core/button/CustomButtonWithIcon.core.component';
import RightArrow from '../../../../assets/icons/RightArrow.icon.asset';
import {titles} from '../../../../assets/js/titles.message';
import {contactInterface} from '../../../../services/formatter/contact.formatter';
import {showAlertWithTwoActions} from '../../../../utilities/helper.utility';
import {messages} from '../../../../assets/js/messages.message';
import {customUseDispatch} from '../../../../packages/redux.package';
import {deleteContact} from '../../../../states/features/contact/contacts.slice';
import IconWithTextHeader from '../../../../components/core/headers/IconWithTextHeader.app.component';
import {useCustomNavigation} from '../../../../packages/navigation.package';
import {screens} from '../../../../routes/routeName.route';
import ContactInfoComponent from '../component/ContactInfo.component';
import {contactBottomSheetStyles} from '../../styles/contactBottomSheet.styles';
import contactApiHelper from '../../../../services/api/helper/contactApi.helper';

const ContactDetailsBottomSheet: React.FC<{
  item: contactInterface;
  index?: number;
  campaign?: boolean;
}> = ({item, index = '', campaign = false}) => {
  const {contactId = '', id} = item || {};
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const handleDeleteContact = async () => {
    global.showBottomSheet({flag: false});
    const onPressAction = async (action: any) => {
      action === 'confirm' &&
        (contactApiHelper.deleteContact(id),
        dispatch(deleteContact({id, index})));
    };
    showAlertWithTwoActions({
      title: titles.deleteContact,
      body: messages.deleteContactMessage,
      onPressAction,
    });
  };
  const handleEditContact = () => {
    global.showBottomSheet({flag: false});
    navigation.navigate(screens.addContact as never, {
      id: contactId || id,
      action: 'edit',
    });
  };

  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <IconWithTextHeader
        controlLeftIcon={() => global.showBottomSheet({flag: false})}
        rightComponent={
          !campaign && (
            <View style={contactBottomSheetStyles.headerContainer}>
              <TouchableOpacity activeOpacity={0.5} onPress={handleEditContact}>
                <EditIcon width={28} height={28} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleDeleteContact}>
                <DeleteIcon fill={colors.error1} width={28} height={28} />
              </TouchableOpacity>
            </View>
          )
        }
      />
      <View style={{...customPadding(12, 20, 0, 20)}}>
        <ContactInfoComponent item={item} />
        <CustomButtonWithIcon
          onPress={() => {
            navigation.navigate(screens.contactDetails as never, {
              id: contactId || id,
              index,
            });
            global.showBottomSheet({flag: false});
          }}
          icon={<RightArrow />}
          iconPosition="right"
          text={titles.viewDetails}
          classes="secondary"
        />
      </View>
    </View>
  );
};

export default ContactDetailsBottomSheet;

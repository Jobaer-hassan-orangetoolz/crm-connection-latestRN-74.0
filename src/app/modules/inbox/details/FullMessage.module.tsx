/* eslint-disable react-native/no-inline-styles */
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import Container from '../../../layouts/Container.layout';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../assets/styles/colors.style.asset';
import {buttons} from '../../../assets/js/buttons.message';
import {titles} from '../../../assets/js/titles.message';
import EmailActionField from '../components/EmailActionField.component';
import {customPadding} from '../../../assets/styles/global.style.asset';
import InputWithIcon from '../../../components/core/input/InputWithIcon.core.component';
import PersonalizedIcon from '../../../assets/icons/Personalized.icon.asset';
import MultiLineInput from '../../../components/core/input/MultiLineInput.core.component';
import {placeholders} from '../../../assets/js/placeholders.message';
import PersonalizedTags from '../bottomSheet/PersonalizedTags.bottmSheet';
import {screens} from '../../../routes/routeName.route';
import SaveTemplateIcon from '../../../assets/icons/SaveTemplate.icon.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {storeType} from '../../../states/features/inbox/quickReply.slice';
import ScheduleOption from '../bottomSheet/ScheduleOption.bottomSheet';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {userStates} from '../../../states/allSelector.state';
import {
  formatPhoneNumber,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import useFullMessage from '../hooks/useFullMessage.hook';
import CheckboxActive from '../../../assets/icons/CheckboxActive.icon.asset';
import CheckboxInActive from '../../../assets/icons/CheckboxInActive.icon.asset';
import {messages} from '../../../assets/js/messages.message';
type params = {
  number?: any;
  contactId?: any;
  message?: string;
  fromNumber: any;
};

interface fullMessageType {
  route?: {
    params?: params;
  };
}
const FooterActions = ({
  handlePersonalizeText,
  handleQuickReply,
  scheduleData,
  handleSubmit,
  messageValidation,
}: any) => {
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const toQuicReply = () => {
    navigation.navigate(screens.quickReply, {
      handleSuccessReply: handleQuickReply,
    });
    dispatch(storeType({type: 2}));
  };
  return (
    <View style={styles.footer}>
      <View style={styles.footerEach}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
            global.showBottomSheet({
              flag: true,
              component: PersonalizedTags,
              componentProps: {
                handlePress: handlePersonalizeText,
                name: 'message',
              },
            });
          }}>
          <PersonalizedIcon />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={toQuicReply}>
          <SaveTemplateIcon />
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={0.7}>
          <AttachmentIcon />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.footerEach, styles.gap8]}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => {
            const status = messageValidation();
            if (!status) {
              return showAlertWithOneAction({
                body: messages.fillFormCorrectly,
                title: titles.wrongTry,
              });
            }
            global.showBottomSheet({
              flag: true,
              component: ScheduleOption,
              componentProps: {
                handleSubmit: handleSubmit,
                scheduleData: scheduleData,
              },
            });
          }}
          style={[styles.button, {backgroundColor: colors.gray9}]}>
          <Text style={styles.scheduleBtn}>{buttons.schedule}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CustomPicker = ({onChangeText, templateFlag, setTemplateFlag}: any) => {
  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity
        style={styles.pickerBtn}
        onPress={() => {
          setTemplateFlag(!templateFlag);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!templateFlag && <CheckboxInActive />}
          {templateFlag && <CheckboxActive />}
        </View>
        <Text style={{...typographies.bodySmallBold}}>
          Save as quick reply template
        </Text>
      </TouchableOpacity>
      <View style={{flexGrow: 1}}>
        {templateFlag && (
          <InputWithIcon
            placeholder={placeholders.titleForQR}
            name={'replyTitle'}
            onChangeText={onChangeText}
          />
        )}
      </View>
    </View>
  );
};
const FullMessage: React.FC<fullMessageType> = ({
  route: {
    params: {number, contactId, message, fromNumber},
  },
}) => {
  const {userVNs} = customUseSelector(userStates);
  const {
    messageText,
    onChangeText,
    onSelectionChange,
    messageInputRef,
    handleSubmit,
    getDataHandler,
    handleVirtualNumber,
    vn,
    handlePersonalizeText,
    handleQuickReply,
    templateFlag,
    setTemplateFlag,
    scheduleData,
    messageValidation,
    isLoading,
  }: any = useFullMessage({
    contactId: contactId,
    message: message,
    fromNumber: fromNumber,
  });
  return (
    <Container>
      <RightLeftActionHeader
        title={titles.newMessage}
        right={isLoading ? buttons.sending : buttons.send}
        rightHandlerDisable={isLoading}
        rightHandler={() => {
          const status = messageValidation();
          if (!status) {
            return showAlertWithOneAction({
              title: titles.wrongTry,
              body: messages.fillFormCorrectly,
            });
          }
          handleSubmit();
        }}
        isAnimating={false}
      />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'on-drag'}>
        <View style={styles.container}>
          <EmailActionField
            component={BottomSheetSelect}
            value={
              formatPhoneNumber(vn.number) || placeholders.noSenderSelected
            }
            componentProps={{
              onChange: (item: any) => {
                handleVirtualNumber(item);
              },
              options: {
                data: userVNs,
                title: titles.virtualNumber,
                refreshButton: true,
                titleFieldFormatter: (_item: any) => {
                  return formatPhoneNumber(_item.virtualNumber);
                },
                getDataHandler,
              },
            }}
          />
          <EmailActionField
            title={'To'}
            disabled={true}
            value={formatPhoneNumber(number)}
            disableIcon={true}
          />
        </View>
        <View style={styles.inputWrp}>
          <MultiLineInput
            placeholder={placeholders.writeHere}
            placeholderTextColor={colors.gray4}
            onChangeText={onChangeText}
            defaultValue={messageText}
            name={'message'}
            inputProps={{onSelectionChange, ref: messageInputRef}}
          />
          <CustomPicker
            onChangeText={onChangeText}
            templateFlag={templateFlag}
            setTemplateFlag={setTemplateFlag}
          />
          <FooterActions
            handlePersonalizeText={handlePersonalizeText}
            handleQuickReply={handleQuickReply}
            scheduleData={scheduleData}
            handleSubmit={handleSubmit}
            messageValidation={messageValidation}
          />
        </View>
      </ScrollView>
    </Container>
  );
};
export default FullMessage;
const styles = StyleSheet.create({
  container: {
    ...customPadding(20, 20, 16, 20),
  },
  inputWrp: {gap: 16, ...customPadding(0, 20, 0, 20)},
  footer: {
    ...customPadding(4, 0, 4, 0),
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: 2,
    justifyContent: 'space-between',
  },
  footerEach: {flexDirection: 'row', gap: 16},
  gap8: {gap: 8},
  button: {borderRadius: 100, ...customPadding(8, 16, 8, 16)},
  scheduleBtn: {...typographies.bodyMediumBold},
  sendBtn: {...typographies.bodyMediumBold, color: colors.white},
  pickerContainer: {
    gap: 16,
    flexGrow: 1,
  },
  pickerBtn: {flexDirection: 'row', gap: 16, alignItems: 'center'},
});

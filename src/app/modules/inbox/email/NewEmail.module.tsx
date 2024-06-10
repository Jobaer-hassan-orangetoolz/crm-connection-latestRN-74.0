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
import useNewEmail from './useNewEmail.hook';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {customUseDispatch} from '../../../packages/redux.package';
import {storeType} from '../../../states/features/inbox/quickReply.slice';
import ScheduleOption from '../bottomSheet/ScheduleOption.bottomSheet';
import CheckboxInActive from '../../../assets/icons/CheckboxInActive.icon.asset';
import CheckboxActive from '../../../assets/icons/CheckboxActive.icon.asset';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import BottomSheetSelectWithSubtitle from '../../../components/app/BottomSheetSelectWithSubtitle.app.component';
import {messages} from '../../../assets/js/messages.message';
import InboxThreadModel from '../../../services/models/InboxThread.model';
type params = {
  contactId?: any;
  email?: string;
  from?: string;
};

interface newEmailType {
  route?: {
    params?: params;
  };
}
const FooterActions = ({
  handlePersonalizeText,
  handleQuickReply,
  scheduleData,
  handleSubmit,
  EmailValidation,
  isLoading,
}: any) => {
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const toQuicReply = () => {
    navigation.navigate(screens.quickReply, {
      handleSuccessReply: handleQuickReply,
    });
    dispatch(storeType({type: 1}));
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
            const status = EmailValidation();
            if (!status) {
              return showAlertWithOneAction({
                body: 'please fill up the form correctly',
                title: 'Sorry! Wrong input',
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
        <TouchableOpacity
          activeOpacity={0.3}
          disabled={isLoading}
          onPress={() => {
            const status = EmailValidation();
            if (!status) {
              return showAlertWithOneAction({
                title: titles.wrongTry,
                body: messages.fillFormCorrectly,
              });
            }
            handleSubmit();
          }}
          style={[styles.button, {backgroundColor: colors.primary}]}>
          <Text style={[styles.scheduleBtn, {color: colors.white}]}>
            {isLoading ? buttons.sending : buttons.send}
          </Text>
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
const NewEmail: React.FC<newEmailType> = ({
  route: {
    params: {contactId, email, from},
  },
}) => {
  const {
    onChangeText,
    onSelectionChange,
    subjectInputRef,
    messageInputRef,
    handlePersonalizeText,
    setTemplateFlag,
    templateFlag,
    handleQuickReply,
    scheduleData,
    subjectText,
    messageText,
    handleSubmit,
    EmailValidation,
    userInfo,
    fromEmail,
    handleFromEmail,
    isLoading,
  } = useNewEmail({contactId: contactId, from: from});
  const getDataHandler = async (query: any, success: any) => {
    if (userInfo.email_provider === InboxThreadModel.emailProvider.nylas) {
      const payload = {
        status: true,
        body: userInfo.emailList,
      };
      success(payload);
    } else {
      const {page, perPage} = query;
      const payload = {page: page, perPage: perPage};
      const result = await campaignApiHelper.getCampaignEmail(payload);
      if (page === 1 && !isEmpty(userInfo?.defaultEmail)) {
        result.body.unshift({
          campaignEmail: userInfo.defaultEmail || userInfo.email,
          title: 'default',
        });
      }
      success(result);
    }
  };
  return (
    <Container>
      <RightLeftActionHeader
        title={titles.newEmail}
        right={null}
        // right={isLoading ? buttons.sending : buttons.send}
        // rightHandlerDisable={isLoading}
        // rightHandler={() => {
        //   const status = EmailValidation();
        //   if (!status) {
        //     return showAlertWithOneAction({
        //       title: titles.wrongTry,
        //       body: messages.fillFormCorrectly,
        //     });
        //   }
        //   handleSubmit();
        // }}
        isAnimating={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'on-drag'}>
        <View style={styles.container}>
          <EmailActionField
            component={BottomSheetSelectWithSubtitle}
            value={fromEmail}
            componentProps={{
              options: {
                getDataHandler,
                flatList: true,
                titleField:
                  userInfo.email_provider ===
                  InboxThreadModel.emailProvider.nylas
                    ? 'FULL__DATA'
                    : 'campaignEmail',
                title: 'Email list',
                subtitleField:
                  userInfo.email_provider ===
                  InboxThreadModel.emailProvider.nylas
                    ? 'FULL__DATA'
                    : 'title',
                selectedValue: fromEmail,
                titleFieldFormatter: (_value: any) => {
                  return userInfo.email_provider ===
                    InboxThreadModel.emailProvider.nylas
                    ? _value
                    : _value.campaignEmail;
                },
              },
              onChange: (value: string) => {
                handleFromEmail(value);
              },
            }}
            textStyles={{width: '100%'}}
          />
          <EmailActionField
            title={'To'}
            value={email}
            disabled={true}
            disableIcon={true}
          />
        </View>
        <View style={styles.inputWrp}>
          <InputWithIcon
            name={'subject'}
            rightHandler={() => {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
              }
              global.showBottomSheet({
                flag: true,
                component: PersonalizedTags,
                componentProps: {
                  handlePress: handlePersonalizeText,
                  name: 'subject',
                },
              });
            }}
            rightIcon={<PersonalizedIcon />}
            onChangeText={onChangeText}
            defaultValue={subjectText}
            placeholder={placeholders.subject}
            inputProps={{onSelectionChange, ref: subjectInputRef}}
          />
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
            EmailValidation={EmailValidation}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </Container>
  );
};
export default NewEmail;
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

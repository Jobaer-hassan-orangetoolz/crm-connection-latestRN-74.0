/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {
  formatPhoneNumber,
  getHexaOpacityColorCode,
} from '../../../utilities/helper.utility';
import {
  customPadding,
  customMargin,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CustomDropdown from '../../../components/core/CustomDropdown.core.component';
import {titles} from '../../../assets/js/titles.message';
import {placeholders} from '../../../assets/js/placeholders.message';
import ImagePreview from '../../../components/core/ImagePreview.core.component';
import PersonalizedIcon from '../../../assets/icons/Personalized.icon.asset';
import SaveTemplateIcon from '../../../assets/icons/SaveTemplate.icon.asset';
import {buttons} from '../../../assets/js/buttons.message';
import VirtualNumbers from './VirtualNumbers.module';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import PersonalizedTags from '../bottomSheet/PersonalizedTags.bottmSheet';
import useConversation from '../hooks/useConversation.hook';
import {screens} from '../../../routes/routeName.route';
import {customUseDispatch} from '../../../packages/redux.package';
import {storeType} from '../../../states/features/inbox/quickReply.slice';
import ExpandIcon from '../../../assets/icons/Expand.icon.asset';
import CrossIcon from '../../../assets/icons/Cross.icon.asset';

const Select = ({
  title = titles.from,
  value = '',
  component = <></>,
  componentProps = {},
  listFor = 'vn',
  disabled = false,
  disabledIcon = false,
}: any) => {
  return (
    <View style={styles.select}>
      <Text style={[typographies.bodyMedium, {color: colors.gray4}]}>
        {title}
      </Text>
      {listFor === 'vn' && (
        <VirtualNumbers
          value={value}
          textStyles={styles.textStyles}
          onChange={() => {}}
        />
      )}
      {listFor === 'to' && (
        <CustomDropdown
          text={value}
          iconFill={colors.gray0}
          component={component}
          textStyles={styles.textStyles}
          containerStyles={styles.flex0}
          componentProps={componentProps}
          disabled={disabled}
          disableIcon={disabledIcon}
        />
      )}
    </View>
  );
};
const InputBox = ({
  mmsUrl = '',
  handleChange,
  textInputRef,
  onSelectionChange,
  defaultValue,
}: any) => {
  return (
    <View style={[styles.body, mmsUrl !== '' ? styles.bodyAlt : {}]}>
      <TextInput
        style={[styles.textInput, mmsUrl !== '' ? styles.textInputAlt : {}]}
        placeholder={placeholders.typing}
        numberOfLines={1}
        onChangeText={handleChange}
        ref={textInputRef}
        onSelectionChange={onSelectionChange}
        defaultValue={defaultValue}
      />
      {mmsUrl !== '' && (
        <View style={styles.imgWrp}>
          <ImagePreview
            source={{
              uri: mmsUrl,
            }}
            styles={styles.img}
          />
        </View>
      )}
    </View>
  );
};
const FooterActions = ({
  handlePersonalizeText,
  navigation,
  handleSuccessReply,
  handleSubmit,
  contactId,
  number,
  messageText,
  isLoading,
  fromNumber,
}: any) => {
  const dispatch = customUseDispatch();
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            dispatch(storeType({type: 2}));
            navigation.navigate(screens.quickReply, {
              handleSuccessReply: handleSuccessReply,
            });
          }}>
          <SaveTemplateIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.fullMessage, {
              contactId: contactId,
              number: number,
              message: messageText,
              fromNumber: fromNumber,
            });
          }}>
          <ExpandIcon />
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={0.7}>
          <ImageIcon />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.footerEach, styles.gap8]}>
        {/* <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => {
            global.showBottomSheet({flag: true, component: ScheduleOption});
          }}
          style={[styles.button, {backgroundColor: colors.gray9}]}>
          <Text style={styles.scheduleBtn}>{buttons.schedule}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={handleSubmit}
          style={[styles.button, {backgroundColor: colors.primary}]}>
          <Text style={styles.sendBtn}>
            {isLoading ? buttons.sending : buttons.send}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SmsSendShort: React.FC<any> = ({handleSms, contactId, number}: any) => {
  const {
    messageText,
    handleChangeText,
    textInputRef,
    onSelectionChange,
    navigation,
    handleSuccessReply,
    handleSubmit,
    userVNs,
    getDataHandler,
    handleFromNumber,
    handlePersonalizeText,
    fromNumber,
    isLoading,
  } = useConversation({contactId: contactId});
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Select
          title={titles.from}
          component={BottomSheetSelect}
          componentProps={{
            onChange: (value: any) => {
              handleFromNumber(value);
            },
            options: {
              data: userVNs,
              title: titles.virtualNumber,
              refreshButton: true,
              titleFieldFormatter: (_item: any) => {
                if (typeof _item === 'object') {
                  return formatPhoneNumber(_item.virtualNumber);
                }
                return formatPhoneNumber(_item);
              },
              getDataHandler,
              selectedValue: fromNumber.number,
            },
          }}
          value={fromNumber.number || userVNs[0]?.virtualNumber}
          listFor={'to'}
        />
        <TouchableOpacity
          onPress={() => {
            handleSms();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CrossIcon />
        </TouchableOpacity>
      </View>
      <InputBox
        defaultValue={messageText}
        handleChange={handleChangeText}
        textInputRef={textInputRef}
        onSelectionChange={onSelectionChange}
      />
      <FooterActions
        handlePersonalizeText={handlePersonalizeText}
        navigation={navigation}
        handleSuccessReply={handleSuccessReply}
        handleSubmit={handleSubmit}
        contactId={contactId}
        number={number}
        messageText={messageText}
        isLoading={isLoading}
        fromNumber={fromNumber}
      />
    </View>
  );
};
export default SmsSendShort;

const styles = StyleSheet.create({
  container: {
    maxHeight: 412,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...customPadding(12, 16, 12, 16),
    elevation: 10,
    backgroundColor: colors.white,
    borderTopColor: getHexaOpacityColorCode('#0C2443', 0.1),
    borderTopWidth: 1,
    gap: 2,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    // gap: 32,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  flex0: {flex: 0},
  body: {
    flexDirection: 'row',
    gap: 10,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...customMargin(16, 0, 16, 0),
    maxHeight: 88,
    minHeight: 48,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.primary,
    ...customPadding(0, 16, 0, 16),
  },
  bodyAlt: {...customPadding(12, 16, 12, 16)},
  footer: {
    ...customPadding(4, 0, 4, 0),
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: 2,
    justifyContent: 'space-between',
  },
  textStyles: {...typographies.bodySmallBold},
  select: {
    gap: 4,
    ...customPadding(8, 0, 0, 0),
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {flexGrow: 1, ...typographies.bodyMedium, flex: 1},
  textInputAlt: {alignSelf: 'flex-end', padding: 0, margin: 0},
  imgWrp: {
    height: 64,
    width: 64,
    opacity: 0.5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  img: {width: '100%', height: '100%', overflow: 'hidden'},
  footerEach: {flexDirection: 'row', gap: 16},
  gap8: {gap: 8},
  button: {borderRadius: 100, ...customPadding(8, 16, 8, 16)},
  scheduleBtn: {...typographies.bodyMediumBold},
  sendBtn: {...typographies.bodyMediumBold, color: colors.white},
});

import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../layouts/Container.layout';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {titles} from '../../assets/js/titles.message';
import CustomSwitch from '../../components/core/CustomSwitch.core.component';
import CustomFieldModel from '../../services/models/CustomField.model';
import CustomFieldLayout from '../contact/add/custom-fields/Layout.customField';
import {placeholders} from '../../assets/js/placeholders.message';
import {profileStyles} from './styles/profile.styles';
import {messages} from '../../assets/js/messages.message';
import {
  customUseDispatch,
  customUseSelector,
} from '../../packages/redux.package';
import {authStates} from '../../states/allSelector.state';
import RightLeftActionHeader from '../../components/core/headers/RightLeftActionHeader.core.component';
import {buttons} from '../../assets/js/buttons.message';
import LeftArrowIcon from '../../assets/icons/LeftArrow.icon.asset';
import {useCustomNavigation} from '../../packages/navigation.package';
import userApiHelper from '../../services/api/helper/userApi.helper';
import {storeUserData} from '../../states/features/auth/auth.slice';

const UpdateAppointment: React.FC = () => {
  const navigation = useCustomNavigation();
  const {userInfo} = customUseSelector(authStates);
  const {appointmentUrl, isShowAppointmentUrl} = userInfo || {
    isShowAppointmentUrl: false,
    appointmentUrl: '',
  };
  const dispatch = customUseDispatch();
  const [show, setShow] = useState<boolean>(isShowAppointmentUrl);
  const urlRef = useRef<string>(appointmentUrl);
  const handleCheck = () => {
    setShow(!show);
  };
  const handleSubmit = async () => {
    const payload = {
      name: 'appointment_url',
      isActiveAppointUrl: show,
      value: urlRef.current,
    };
    dispatch(
      storeUserData({
        ...userInfo,
        isShowAppointmentUrl: show,
        appointmentUrl: urlRef.current,
      }),
    );
    userApiHelper.updateProfile(payload);
    navigation.goBack();
  };
  return (
    <Container>
      <RightLeftActionHeader
        right={buttons.save}
        rightHandler={handleSubmit}
        leftIcon={<LeftArrowIcon />}
        isAnimating={false}
        rightHandlerDisable={false}
        border="noBorder"
      />
      <View style={{...customPadding(12, 20, 20, 20)}}>
        <Text style={typographies.headingLarge} numberOfLines={2}>
          {titles.appointment}
        </Text>
        <Text
          style={[
            typographies.bodyMedium,
            {...customPadding(8, 0, 12), color: colors.gray4},
          ]}
          numberOfLines={2}>
          {titles.appointmentBio}
        </Text>
        <View style={profileStyles.appointmentContainer}>
          <View style={globalStyles.flexShrink1}>
            <Text style={typographies.bodyMediumBold}>{titles.showEmail}</Text>
            <Text
              style={[
                typographies.bodySmall,
                {color: colors.gray4, ...customPadding(2)},
              ]}>
              {messages.appointmentURLBio}
            </Text>
          </View>
          <CustomSwitch
            activeColor={colors.primary}
            value={show}
            onPress={handleCheck}
          />
        </View>
        <View style={{...customMargin(20)}}>
          <CustomFieldLayout
            label={titles.appointmentLabel}
            value={urlRef.current}
            onChange={(text: string) => (urlRef.current = text)}
            placeholder={placeholders.appointmentURL}
            type={CustomFieldModel.TYPE_URL}
            showRemove={false}
          />
        </View>
      </View>
    </Container>
  );
};

export default UpdateAppointment;

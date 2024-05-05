import {View} from 'react-native';
import React, {useState} from 'react';
import DetailsCard from '../../contact/details/component/DetailsCard.component';
import ChatIcon from '../../../assets/icons/Chat.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import WebIcon from '../../../assets/icons/Web.icon.asset';
import EmailIcon from '../../../assets/icons/Email.icon.asset';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {messages} from '../../../assets/js/messages.message';
import {titles} from '../../../assets/js/titles.message';
import CampaignResponseBottomSheet from '../bottomSheet/CampaignResponse.bottomSheet';
import {campaignResponseOptions} from '../../../assets/js/dropdown.data';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {authStates, userStates} from '../../../states/allSelector.state';
import CustomSwitch from '../../../components/core/CustomSwitch.core.component';
import ActivityIcon from '../../../assets/icons/Activity.icon.asset';
import CallIcon from '../../../assets/icons/Call.icon.asset';
import {formatPhoneNumber} from '../../../utilities/helper.utility';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {timezoneList} from '../../../services/models/_Timezone.modal';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';

const CampaignOtherOptions: React.FC<{
  extraData: any;
  setItem: any;
}> = ({extraData = {}, setItem}) => {
  const {
    virtualNumber,
    carryOnCampaign,
    campaignEmail,
    isContinueAfterFail,
    startTime,
    id,
  } = extraData;
  const [value, setValue] = useState<number>(carryOnCampaign);
  const currentTime = '0000-00-00 00:00:00';
  const editTable = startTime === currentTime;
  const [afterFail, setAfterFail] = useState<boolean>(
    isContinueAfterFail ? true : false,
  );
  const updateCampaign = async (
    type:
      | 'carry_on_campaign'
      | 'is_continue_after_fail'
      | 'timezone'
      | 'campaign_number',
    _value: any,
  ) => {
    const payload = {
      campaignId: id,
      type,
      value: _value,
    };
    campaignApiHelper.updateCampaign(payload);
  };
  const {userInfo: {isEmailProviderNylas = false, connectedEmail = ''} = {}} =
    customUseSelector(authStates) || {};
  const {userVNs} = customUseSelector(userStates) || {};
  const dispatch = customUseDispatch();
  const handlePress = (params: number) => {
    setValue(params);
    updateCampaign('carry_on_campaign', params);
  };
  const handleAfterFail = () => {
    setAfterFail(!afterFail);
  };
  const getDataHandler = async () => {
    dispatch(getUserVirtualNumber(true));
  };
  const handleVirtualNumber = (__item: any) => {
    setItem((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        virtualNumber: __item.virtualNumber,
      },
    }));
    updateCampaign('campaign_number', __item.id);
  };
  const handleTimeZone = (__item: any) => {
    setItem((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        timezone: __item.data,
      },
    }));
    updateCampaign('timezone', __item.data);
  };
  const getTimezone = () => {
    return extraData?.timezone
      ? timezoneList.find((item: any) => item.data === extraData?.timezone)
          .value
      : extraData?.timezone;
  };
  return (
    <View
      style={{
        ...customPadding(8, 0, 8),
        backgroundColor: colors.white,
        borderRadius: rs(12),
        ...customMargin(12),
      }}>
      <DetailsCard
        title={messages.campaignResponse}
        text={
          campaignResponseOptions.find(_item => {
            return _item.id === value;
          }).name
        }
        onPress={() =>
          global.showBottomSheet({
            flag: true,
            component: CampaignResponseBottomSheet,
            componentProps: {value, handlePress},
          })
        }
        icon={<ChatIcon width={24} height={24} fill={colors.primary} />}
      />
      <DetailsCard
        title={titles.campaignEmails}
        text={`${
          isEmailProviderNylas ? connectedEmail + '\n' : ''
        } ${campaignEmail}`}
        icon={<EmailIcon width={24} height={24} fill={colors.primary} />}
        rightIcon={false}
        disabled={true}
      />
      <DetailsCard
        title={titles.virtualNumber}
        text={formatPhoneNumber(virtualNumber) || titles.selectVirtualNumber}
        disabled={!editTable}
        always={true}
        onPress={() =>
          global.showBottomSheet({
            flag: true,
            component: BottomSheetSelect,
            componentProps: {
              onChange: handleVirtualNumber,
              options: {
                data: userVNs,
                title: titles.virtualNumber,
                refreshButton: true,
                titleFieldFormatter: (_item: any) => {
                  return formatPhoneNumber(_item.virtualNumber);
                },
                getDataHandler,
              },
            },
          })
        }
        icon={<CallIcon width={24} height={24} fill={colors.primary} />}
      />
      <DetailsCard
        title={titles.campaignFail}
        text={messages.campaignFailedAttempt}
        rightIconComponent={
          <CustomSwitch
            value={afterFail}
            activeColor={colors.primary}
            onPress={handleAfterFail}
          />
        }
        icon={<ActivityIcon width={24} height={24} fill={colors.primary} />}
      />
      <DetailsCard
        title={titles.campaignTimezone}
        text={getTimezone()}
        disabled={!editTable}
        always={true}
        onPress={() =>
          global.showBottomSheet({
            flag: true,
            component: BottomSheetSelect,
            componentProps: {
              onChange: handleTimeZone,
              options: {
                data: timezoneList,
                titleField: 'data',
                search: false,
                refreshing: false,
                title: titles.campaignTimezone,
              },
            },
          })
        }
        icon={<WebIcon width={24} height={24} fill={colors.primary} />}
      />
    </View>
  );
};

export default CampaignOtherOptions;

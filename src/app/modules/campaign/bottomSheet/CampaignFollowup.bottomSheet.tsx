/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {messages} from '../../../assets/js/messages.message';
import CustomButton from '../../../components/core/button/CustomButton.core.component';
import {buttons} from '../../../assets/js/buttons.message';
import CampaignStartBottomSheet from './CampaignStart.bottomSheet';
import {SCREEN_HEIGHT} from '../../../assets/js/core.data';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {colors} from '../../../assets/styles/colors.style.asset';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';

const CampaignFollowupBottomSheet: React.FC<{
  onPress: (flag: boolean) => void;
  id: number;
}> = ({onPress = () => {}, id}) => {
  const [state, setState] = useState<{isLoading: boolean; verify: boolean}>({
    isLoading: true,
    verify: false,
  });
  const [actionMessage, setActionMessage] = useState<string>('');
  const verifyCampaign = async () => {
    const result = await campaignApiHelper.validateCampaign(id);
    const {status, body} = result as apiResponse;
    if (status && body.status) {
      setState({isLoading: false, verify: true});
    } else {
      setState({isLoading: false, verify: false});
      body.message === messages.campaignRunning && onPress(true);
      setActionMessage(body.message);
    }
  };
  useEffect(() => {
    verifyCampaign();
  }, []);
  const handleNo = async () => {
    const payload = {
      campaignId: id,
      type: 'resume',
      preventFollowUp: true,
      sendFrom: 'now',
      value: id,
    };
    const result = await campaignApiHelper.updateCampaign(payload);
    const {message, status} = result as apiResponse;
    showAlertWithOneAction({title: titles.campaign, body: message});
    if (status) {
      onPress(true);
    }
  };
  return (
    <View
      style={{
        ...customPadding(12, 20, 10, 20),
        // minHeight: state?.isLoading && SCREEN_HEIGHT * 0.3,
      }}>
      {state.isLoading ? (
        <View style={globalStyles.activityCenter}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : !state.verify ? (
        <View>
          <Text
            style={[
              typographies.bodyMediumBold,
              {color: colors.error1, ...customMargin(0, 0, 10)},
            ]}>
            {messages.actionRequired}
          </Text>
          <Text style={typographies.bodyMedium}>
            {actionMessage === messages.campaignRunning
              ? messages.campaignRunning
              : actionMessage === messages.campaignNoCredit
              ? messages.campaignNoCredit
              : messages.campaignVerify}
          </Text>
        </View>
      ) : (
        <>
          <View style={{...customMargin(0, 0, 24)}}>
            <Text
              style={[
                typographies.headingMedium,
                {...customPadding(20, 0, 8)},
              ]}>
              {messages.campaignFollowup}
            </Text>
            <Text style={typographies.bodyMedium}>
              {messages.followupMessage}
            </Text>
          </View>
          <CustomButton
            text={buttons.no}
            classes="secondary"
            onPress={() => {
              handleNo();
              global.showBottomSheet({flag: false});
            }}
            style={{...customMargin(0, 0, 12)}}
          />
          <CustomButton
            text={buttons.agreeCampaign}
            onPress={() => {
              global.showBottomSheet({
                flag: true,
                component: CampaignStartBottomSheet,
                componentProps: {onPress, id},
              });
            }}
          />
        </>
      )}
    </View>
  );
};

export default CampaignFollowupBottomSheet;

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {messages} from '../../../assets/js/messages.message';
import RightArrowIcon from '../../../assets/icons/RightArrowIcon.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {titles} from '../../../assets/js/titles.message';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';

const CampaignStartBottomSheet: React.FC<{
  onPress: (flag: boolean) => void;
  id: number;
}> = ({onPress = () => {}, id}) => {
  const handlePress = async (value: 'now' | 'next') => {
    const payload = {
      campaignId: id,
      type: 'resume',
      preventFollowUp: true,
      sendFrom: value,
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
    <View style={{...customPadding(12, 20, 10, 20)}}>
      <Text style={[typographies.headingMedium, {...customPadding(12, 0, 12)}]}>
        {messages.campaignFollowup}
      </Text>
      <View>
        <TouchableOpacity
          style={[
            globalStyles.rowBetweenWithoutFlex,
            {...customPadding(10, 0, 10)},
          ]}
          activeOpacity={0.5}
          onPress={() => {
            handlePress('now');
            global.showBottomSheet({flag: false});
          }}>
          <Text numberOfLines={1} style={typographies.bodyMediumBold}>
            {titles.startNow}
          </Text>
          <RightArrowIcon fill={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.rowBetweenWithoutFlex,
            {...customPadding(10, 0, 10)},
          ]}
          activeOpacity={0.5}
          onPress={() => {
            handlePress('next');
            global.showBottomSheet({flag: false});
          }}>
          <Text numberOfLines={1} style={typographies.bodyMediumBold}>
            {titles.startNextDay}
          </Text>
          <RightArrowIcon fill={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CampaignStartBottomSheet;

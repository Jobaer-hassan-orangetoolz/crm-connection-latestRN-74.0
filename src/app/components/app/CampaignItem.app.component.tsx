import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {campaignInterface} from '../../services/formatter/campaign.formatter';
import {
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import RightArrow from '../../assets/icons/RightArrow.icon.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {campaignStatus} from '../../services/models/Campaign.modal';
import CampaignBottomSheet from '../../modules/contact/details/bottomSheet/Campaign.BottomSheet';
import {
  aboutContactInterface,
  storeContactDetails,
} from '../../states/features/contact/aboutContact.slice';
import {
  customUseDispatch,
  customUseSelector,
} from '../../packages/redux.package';
import {aboutContactStates} from '../../states/allSelector.state';
import contactApiHelper from '../../services/api/helper/contactApi.helper';
import {
  showAlertWithOneAction,
  showAlertWithTwoActions,
} from '../../utilities/helper.utility';
import {titles} from '../../assets/js/titles.message';
import {apiResponse} from '../../services/api/api.interface';

const CampaignItem: React.FC<{
  item: campaignInterface;
  id?: number;
  index: number;
}> = ({item, id, index}) => {
  const {id: campaignId, isUnsubscribed, title = '', status} = item;
  const [check, setCheck] = useState<number>(status);
  const [unSubscribed, setUnSubscribed] = useState<number>(isUnsubscribed);
  const {campaigns}: aboutContactInterface =
    customUseSelector(aboutContactStates);
  const dispatch = customUseDispatch();
  const handleCheck = (params: number) => {
    const type: 'pause' | 'resume' | 'unsubscribe' = (() => {
      switch (params) {
        case 3:
          return 'resume';
        case 5:
          return 'pause';
        case 0:
          return 'unsubscribe';
      }
    })();
    const onPressAction = async (value: any) => {
      if (value === 'cancel') {
        return;
      }
      if (params === 0) {
        setUnSubscribed(1);
      }
      params && setCheck(params);
      const result = await contactApiHelper.contactCampaignPauseResume({
        type,
        campaignId: campaignId,
        contactId: id,
      });
      const {status: resultStatus, message} = result as apiResponse;
      if (resultStatus) {
        const updateCampaigns = [...campaigns];
        const object = {
          ...updateCampaigns[index],
          campaignContactsStatus: params,
          isUnsubscribed: params === 0 ? 1 : 0,
        };
        updateCampaigns[index] = object;
        dispatch(
          storeContactDetails({
            campaignsLoading: false,
            gettingCampaigns: true,
            refreshing: false,
            campaigns: updateCampaigns,
          }),
        );
      } else {
        showAlertWithOneAction({title: titles.campaign, body: message});
      }
    };
    showAlertWithTwoActions({
      title: titles.campaign,
      body: `Are you ${type} this ${titles.campaign}`,
      onPressAction,
    });
  };
  const handleOpen = () => {
    global.showBottomSheet({
      flag: true,
      component: CampaignBottomSheet,
      componentProps: {handleCheck, check},
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleOpen}
      disabled={isUnsubscribed ? true : false}
      style={styles.container}>
      <View style={globalStyles.flexShrink1}>
        <Text numberOfLines={1} style={typographies.bodyMediumBold}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[typographies.bodySmall, {color: colors.gray4}]}>
          {unSubscribed
            ? 'Unsubscribed'
            : (campaignStatus as any)[check]
            ? 'Running'
            : 'Paused'}
        </Text>
      </View>
      {!unSubscribed && <RightArrow fill={colors.gray6} />}
    </TouchableOpacity>
  );
};

export default CampaignItem;

const styles = StyleSheet.create({
  container: {
    ...customPadding(12, 20, 12, 20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 13,
    width: '100%',
  },
});

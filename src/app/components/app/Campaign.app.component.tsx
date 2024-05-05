import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {customPadding} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import CampaignCount from './CampaignCount.app.component';
import CampaignIcon from '../../assets/icons/Campaign.icon.asset';
import OutlineCheckCircleIcon from '../../assets/icons/OutlineCheckCircle.icon.asset';
import ChatIcon from '../../assets/icons/Chat.icon.asset';
import ClickableText from '../core/ClickableText.core.component';
import {buttons} from '../../assets/js/buttons.message';
import CustomSwitch from '../core/CustomSwitch.core.component';
import {titles} from '../../assets/js/titles.message';
import {
  formatDate,
  showAlertWithOneAction,
} from '../../utilities/helper.utility';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';
import {
  campaignFormatter,
  campaignInterface,
  campaignItemInterface,
} from '../../services/formatter/campaign.formatter';
import CampaignFollowupBottomSheet from '../../modules/campaign/bottomSheet/CampaignFollowup.bottomSheet';
import {campaignStatus} from '../../services/models/Campaign.modal';
import campaignApiHelper from '../../services/api/helper/campaignApi.helper';
import {apiResponse} from '../../services/api/api.interface';

const CampaignComponent: React.FC<{
  item: campaignItemInterface;
  style?: ViewStyle;
  index?: number;
}> = ({item, style = {}, index = -1}) => {
  const navigation = useCustomNavigation<any>();
  const {
    title,
    createdAt,
    responseRate,
    totalContact,
    totalContacted,
    totalResponded,
    id,
    status,
  } = campaignFormatter(item) || ({} as campaignInterface);
  const [isCheck, setIsCheck] = useState<boolean>(
    (campaignStatus as any)[status],
  );
  const handleNavigation = () => {
    navigation.navigate(screens.campaignsDetails as never, {
      id,
      index,
      item,
    });
  };
  const toggleCheck = (flag: boolean) => {
    setIsCheck(flag);
  };
  const handlePress = async () => {
    if (!isCheck) {
      global.showBottomSheet({
        flag: true,
        component: CampaignFollowupBottomSheet,
        componentProps: {onPress: toggleCheck, id},
      });
    } else {
      const payload = {
        campaignId: id,
        type: 'pause',
        value: id,
      };
      const result = await campaignApiHelper.updateCampaign(payload);
      const {message, status: resStatus} = result as apiResponse;
      showAlertWithOneAction({title: titles.campaign, body: message});
      if (resStatus) {
        setIsCheck(false);
      }
    }
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={typographies.bodyLargeBold} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.timeContainer}>
        <ClickableText
          hasUnderline={true}
          style={[typographies.bodyXS, {color: colors.primary}]}
          onPress={() =>
            navigation.navigate(screens.campaignContactList as never, {id})
          }
          text={`${totalContact} ${
            totalContact > 1 ? titles.contacts : titles.contact
          }`}
        />
        <View style={styles.dot} />
        <Text style={[typographies.bodyXS, {color: colors.gray4}]}>
          {formatDate(createdAt, 'DD MMMM, YYYY', '', true)}
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <CampaignCount
          icon={<CampaignIcon height={20} width={20} fill={colors.primary} />}
          count={totalContacted || 0}
          type={titles.connected}
        />
        <CampaignCount
          icon={
            <OutlineCheckCircleIcon
              height={20}
              width={20}
              fill={colors.primary}
            />
          }
          count={totalResponded || 0}
          type={titles.responded}
        />
        <CampaignCount
          icon={<ChatIcon height={20} width={20} fill={colors.primary} />}
          count={`${responseRate}%`}
          type={titles.responseRate}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ClickableText
          onPress={handleNavigation}
          text={buttons.viewDetails}
          style={[typographies.bodySmallBold, {color: colors.primary}]}
          wrpStyle={styles.alignSelf}
        />
        <View style={styles.bottomContainer}>
          <Text
            style={[
              typographies.bodySmall,
              {color: isCheck ? colors.gray0 : colors.gray4},
            ]}>
            {isCheck ? titles.running : titles.paused}
          </Text>
          <CustomSwitch value={isCheck} onPress={handlePress} />
        </View>
      </View>
    </View>
  );
};

export default CampaignComponent;

const styles = StyleSheet.create({
  container: {
    ...customPadding(20, 20, 20, 20),
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  timeContainer: {flexDirection: 'row', alignItems: 'center', gap: 6},
  dot: {
    width: 2,
    height: 2,
    borderRadius: 50,
    backgroundColor: colors.gray4,
  },
  middleContainer: {
    ...customPadding(24, 0, 24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignSelf: {alignSelf: 'center'},
});

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container.layout';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import CustomSwitch from '../../../components/core/CustomSwitch.core.component';
import {titles} from '../../../assets/js/titles.message';
import {campaignDetailsStyles as styles} from '../styles/campaignDetails.style';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {formatDate} from '../../../utilities/helper.utility';
import CampaignOtherOptions from './OtherOptions.campaign';
import useCampaignDetails from '../hook/useCampaignDetails.hook';
import {campaignItemInterface} from '../../../services/formatter/campaign.formatter';
const CampaignDetails: React.FC<{
  route: {params: {id: number; item: campaignItemInterface; index?: number}};
}> = ({route: {params: {id, item, index = -1} = {}}}) => {
  const {
    data,
    isLoading,
    onRefresh,
    isCheck,
    handlePress,
    refreshing,
    setItem,
  } = useCampaignDetails(id, item, index);
  const {title, createdAt} = data || {};
  return (
    <Container bg={colors.secondary}>
      <IconWithTextHeader
        style={{backgroundColor: colors.white}}
        rightComponent={
          !isLoading && (
            <View style={styles.topContainer}>
              <Text
                style={[
                  typographies.bodySmall,
                  {color: isCheck ? colors.gray0 : colors.gray4},
                ]}>
                {isCheck ? titles.running : titles.paused}
              </Text>
              <CustomSwitch value={isCheck} onPress={handlePress} />
            </View>
          )
        }
      />
      {isLoading ? (
        <View style={globalStyles.activityCenter}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              ...customPadding(12, 20, 12, 20),
              backgroundColor: colors.white,
            }}>
            <Text style={typographies.headingLarge} numberOfLines={2}>
              {title}
            </Text>
            <Text style={[typographies.bodyMedium, {...customMargin(8)}]}>
              {formatDate(createdAt, 'DD MMMM, YYYY', '', true)}
            </Text>
          </View>
          <View style={{...customPadding(20, 20, 20, 20)}}>
            {/* <CampaignCounter item={data} /> */}
            <CampaignOtherOptions extraData={data} setItem={setItem} />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default CampaignDetails;

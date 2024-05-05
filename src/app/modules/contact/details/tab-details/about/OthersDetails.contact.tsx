import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {customPadding} from '../../../../../assets/styles/global.style.asset';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import DetailsCard from '../../component/DetailsCard.component';
import Badge from '../../../../../components/app/Badge.app.component';
import {typographies} from '../../../../../assets/styles/typographies.style.asset';
import {titles} from '../../../../../assets/js/titles.message';
import UserIcon from '../../../../../assets/icons/User.icon.asset';
import SourceIcon from '../../../../../assets/icons/Source.icon.asset';
import CampaignIcon from '../../../../../assets/icons/Campaign.icon.asset';
import DealsIcon from '../../../../../assets/icons/Deals.icon.asset';
import TagsIcon from '../../../../../assets/icons/Tags.icon.asset';
import {isEmpty} from '../../../../../utilities/helper.utility';
import {useCustomNavigation} from '../../../../../packages/navigation.package';
import {screens} from '../../../../../routes/routeName.route';
import {placeholders} from '../../../../../assets/js/placeholders.message';

const OthersDetailsContact: React.FC<{
  item: any;
  campaigns: any;
  pipeline: any;
  id: any;
  tags: any;
  contactDetails: any;
}> = ({item, campaigns, pipeline, tags, id, contactDetails}) => {
  const getTags = () => {
    return !isEmpty(tags) ? (
      <View style={styles.container}>
        {tags.map((_item: any = '', index: number = 0) => {
          return (
            <Badge
              text={_item?.tag?.name?.toUpperCase()}
              textStyle={[typographies.labelLarge, {color: colors.gray4}]}
              key={index}
              classes="secondary"
            />
          );
        })}
      </View>
    ) : (
      <Text style={typographies.bodySmall}>{placeholders.selectTags}</Text>
    );
  };
  const navigation = useCustomNavigation<any>();
  const {
    userId = '',
    sourceId = '',
    userName = '',
    sourceTitle = '',
  } = item || {};
  let totalDeal: number = 0;
  let totalCount: number = 0;

  if (!isEmpty(pipeline)) {
    pipeline.forEach((__item: any) => {
      totalDeal += Number(__item.dealValue);
      totalCount += __item.stage ? 1 : 0;
    });
  }
  return (
    <View
      style={{
        ...customPadding(8, 0, 8),
        backgroundColor: colors.white,
        borderRadius: rs(12),
      }}>
      <DetailsCard
        title={titles.leadOwner}
        text={userName}
        always={true}
        onPress={() =>
          navigation.navigate(screens.leadOwner, {
            id,
            ownerId: userId,
          })
        }
        icon={<UserIcon width={24} height={24} fill={colors.primary} />}
      />
      <DetailsCard
        title={titles.leadSource}
        text={sourceId === 0 ? 'Unknown' : sourceTitle}
        always={true}
        onPress={() => navigation.navigate(screens.leadSource, {id, sourceId})}
        icon={<SourceIcon width={24} height={24} fill={colors.primary} />}
      />
      <DetailsCard
        title={titles.campaigns + ' ' + `(${campaigns?.length})`}
        text={
          !isEmpty(campaigns)
            ? campaigns?.map((__item: any) => {
                return __item.campaignTitle + '\n';
              })
            : placeholders.noCampaign
        }
        onPress={() =>
          navigation.navigate(screens.contactCampaign, {id, campaigns})
        }
        icon={<CampaignIcon width={24} height={24} fill={colors.primary} />}
        always={true}
      />
      <DetailsCard
        title={titles.pipeline}
        text={`Total Deal: ${totalCount}\nTotal Deal Value: ${totalDeal}`}
        onPress={() =>
          navigation.navigate(screens.contactPipeline, {
            id,
            pipeline,
            contactDetails,
          })
        }
        icon={<DealsIcon width={24} height={24} fill={colors.primary} />}
        always={true}
      />
      <DetailsCard
        title={titles.tags}
        component={getTags()}
        onPress={() => navigation.navigate(screens.contactTags, {id, tags})}
        always={true}
        icon={<TagsIcon width={24} height={24} fill={colors.primary} />}
      />
    </View>
  );
};

export default OthersDetailsContact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    ...customPadding(8, 0, 8),
  },
});

import {View, ScrollView} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {campaignTabTitles} from '../../../assets/js/dropdown.data';
import Badge from '../../../components/app/Badge.app.component';

const CampaignTab: React.FC<{
  handleStatus: (params: any) => void;
  status?: number;
}> = ({handleStatus = () => {}, status = 'ALL'}) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: rs(8),
          ...customPadding(12, 15, 12, 15),
        }}>
        {campaignTabTitles.map((item, index) => (
          <Badge
            text={item.name}
            onPress={() => handleStatus(item.value)}
            classes={item.value === status ? 'primary' : 'secondary'}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CampaignTab;

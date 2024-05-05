import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {titles} from '../../../assets/js/titles.message';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';

const CampaignFolderBottomSheet: React.FC<{
  list: any[];
  isLoading: boolean;
  handleFolder: (params: any) => void;
}> = ({list = [], isLoading = false, handleFolder = () => {}}) => {
  const updatedList = [{title: 'All Campaigns', id: ''}, ...list];
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <IconWithTextHeader
        text={titles.campaignFolders}
        controlLeftIcon={() => {
          global.showBottomSheet({
            flag: false,
          });
        }}
      />
      {isLoading ? (
        <View style={{height: rs(60)}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        updatedList?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleFolder(item);
                global.showBottomSheet({
                  flag: false,
                });
              }}
              style={{...customPadding(8, 20, 8, 20)}}>
              <Text style={[typographies.bodyMediumBold]}>{item.title}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};

export default CampaignFolderBottomSheet;

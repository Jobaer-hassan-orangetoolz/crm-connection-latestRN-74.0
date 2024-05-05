import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {campaignBottomSheetOptions} from '../../../../assets/js/dropdown.data';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';

const CampaignBottomSheet: React.FC<{
  check: number;
  handleCheck: (params: number) => void;
}> = ({check, handleCheck}) => {
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      {campaignBottomSheetOptions.map((_item: any, index: number) => {
        return (
          check !== _item.id && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                handleCheck(_item.id);
                global.showBottomSheet({flag: false});
              }}
              key={index}
              style={styles.container}>
              {_item.icon}
              <Text
                style={[
                  typographies.bodyMediumBold,
                  {
                    color:
                      _item.name === 'Unsubscribed'
                        ? colors.error1
                        : colors.gray0,
                  },
                ]}>
                {_item.name}
              </Text>
            </TouchableOpacity>
          )
        );
      })}
    </View>
  );
};

export default CampaignBottomSheet;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...customPadding(10, 20, 10, 20),
    gap: 12,
    alignItems: 'center',
  },
});

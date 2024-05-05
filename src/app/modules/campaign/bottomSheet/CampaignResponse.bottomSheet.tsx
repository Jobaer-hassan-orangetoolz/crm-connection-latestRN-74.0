import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {campaignResponseOptions} from '../../../assets/js/dropdown.data';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CheckIcon from '../../../assets/icons/Check.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {messages} from '../../../assets/js/messages.message';

const CampaignResponseBottomSheet: React.FC<{
  value: number;
  handlePress: (params: number) => void;
}> = ({value, handlePress = () => {}}) => {
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <Text
        style={[
          typographies.headingMedium,
          {...customPadding(24, 20, 12, 20)},
        ]}>
        {messages.campaignResponse}
      </Text>
      <View>
        {campaignResponseOptions.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              style={[
                globalStyles.rowBetweenWithoutFlex,
                {
                  ...customPadding(10, 20, 10, 20),
                },
              ]}
              onPress={() => {
                handlePress(item.id);
                global.showBottomSheet({flag: false});
              }}>
              <Text
                style={
                  value === item.id
                    ? typographies.bodyMediumBold
                    : typographies.bodyMedium
                }>
                {item.name}
              </Text>
              {value === item.id && (
                <CheckIcon height={24} width={24} fill={colors.primary} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CampaignResponseBottomSheet;

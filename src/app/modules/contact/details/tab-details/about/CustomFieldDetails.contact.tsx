import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {
  customPadding,
  globalStyles,
} from '../../../../../assets/styles/global.style.asset';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import DetailsCard from '../../component/DetailsCard.component';
import {isEmpty} from '../../../../../utilities/helper.utility';

const CustomFieldDetailsContact: React.FC<{
  customFieldLoading: boolean;
  customField: any;
}> = ({customFieldLoading, customField}) => {
  return customFieldLoading ? (
    <View
      style={[
        globalStyles.centerView,
        {
          ...customPadding(20, 20, 20, 20),
          backgroundColor: colors.white,
          borderRadius: rs(12),
        },
      ]}>
      <ActivityIndicator />
    </View>
  ) : !isEmpty(customField) ? (
    <View
      style={{
        ...customPadding(8, 0, 8),
        backgroundColor: colors.white,
        borderRadius: rs(12),
      }}>
      {customField.map((item: any, index: number) => {
        return (
          item?.user_custom_fields && (
            <DetailsCard
              title={item?.user_custom_fields?.title}
              key={index}
              text={item?.value}
              style={{...customPadding(12, 24, 12, 24)}}
              rightIcon={false}
              always={true}
              disabled={true}
            />
          )
        );
      })}
    </View>
  ) : (
    <></>
  );
};

export default CustomFieldDetailsContact;

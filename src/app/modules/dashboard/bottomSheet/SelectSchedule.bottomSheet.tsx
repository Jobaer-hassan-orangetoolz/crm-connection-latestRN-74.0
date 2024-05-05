import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {selectScheduleOptions} from '../../../assets/js/dropdown.data';
import CheckIcon from '../../../assets/icons/Check.icon.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {dashboardStyles} from '../dahsboardStyles.style';
import {colors} from '../../../assets/styles/colors.style.asset';

const SelectScheduleBottomSheet: React.FC<{
  filter: any;
  filterChange: Function;
}> = ({filter, filterChange}) => {
  return (
    <View style={{...customPadding(12, 0, 10, 12)}}>
      {selectScheduleOptions.map(
        (item: {title: string; value: number | string}, index: number) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={() => {
                filterChange(item);
                global.showBottomSheet({flag: false});
              }}
              style={dashboardStyles.bottomSheet}>
              <Text
                style={
                  item.value === filter.value
                    ? typographies.bodyMediumBold
                    : typographies.bodyMedium
                }>
                {item.title}
              </Text>
              {item.value === filter.value && (
                <CheckIcon fill={colors.primary} />
              )}
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default SelectScheduleBottomSheet;

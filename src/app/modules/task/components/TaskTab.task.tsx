import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {taskStyle as styles} from '../style/task.style';
import {taskTabTitles} from '../../../assets/js/dropdown.data';

const TaskTab: React.FC<{updateTab: any; tab: any}> = ({updateTab, tab}) => {
  const check = (value: any) => {
    return {
      ...customPadding(8, 12, 8, 12),
      borderBottomWidth: tab === value.value ? 2 : 0,
      borderBottomColor:
        tab === value.value ? colors.primary : colors.transparent,
    };
  };
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: rs(20),
          ...customPadding(0, 16, 0, 16),
        }}
        style={styles.tabBorder}>
        {taskTabTitles.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              updateTab(item.value);
            }}
            activeOpacity={0.4}
            key={index}
            style={check(item)}>
            <Text
              style={[
                typographies.bodySmallBold,
                {
                  color: tab === item.value ? colors.black : colors.gray6,
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TaskTab;

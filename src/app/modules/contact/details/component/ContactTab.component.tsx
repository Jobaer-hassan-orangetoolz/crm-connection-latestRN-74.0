import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import rs from '../../../../assets/styles/responsiveSize.style.asset';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {contactTabTitles} from '../../../../assets/js/dropdown.data';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import {taskStyle as styles} from '../../../task/style/task.style';
import {config} from '../../../../../config';

const ContactTab: React.FC<{
  style: ViewStyle;
  tab: any;
  setTab: any;
}> = ({style, tab, setTab}) => {
  return (
    <View style={style}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: rs(16),
          ...customPadding(0, 16, 0, 16),
        }}
        style={styles.tabBorder}>
        {contactTabTitles.map((item, index) => {
          if (!config.extraFeature && item.name === 'Conversations') {
            return null;
          }
          return (
            <TouchableOpacity
              onPress={() => {
                setTab(item);
              }}
              activeOpacity={0.4}
              key={index}
              style={{
                ...customPadding(8, 12, 8, 12),
                borderBottomWidth: rs(tab?.value === item?.value ? 2 : 0),
                borderBottomColor:
                  tab?.value === item.value
                    ? colors.primary
                    : colors.transparent,
              }}>
              <Text
                style={[
                  typographies.bodySmallBold,
                  {
                    color:
                      tab?.value === item.value ? colors.black : colors.gray6,
                  },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ContactTab;

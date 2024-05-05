import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {customPadding} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {htmlEntityReplace} from '../../utilities/helper.utility';
interface QuickReplyType {
  item: QuickReplyItemType;
  onPress: Function;
  index?: number;
}
export interface QuickReplyItemType {
  id: string | number;
  title: string;
  type: number;
  subject: string;
  message: string;
  fileUrl: string;
  attachmentUrls: string;
  status: number;
}
const QuickReplyItem: React.FC<QuickReplyType> = ({
  item,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.titleText}>{item.title}</Text>
      {item.type === 1 && <Text style={styles.descText}>{item.subject}</Text>}
      <Text numberOfLines={3} style={styles.descText}>
        {htmlEntityReplace(item?.message)}
      </Text>
    </TouchableOpacity>
  );
};
export default QuickReplyItem;
const styles = StyleSheet.create({
  container: {
    ...customPadding(20, 40, 20, 20),
    gap: 8,
  },
  titleText: {
    ...typographies.bodyMediumBold,
  },
  descText: {
    ...typographies.bodyXS,
    color: colors.gray4,
  },
});

import {View, Text} from 'react-native';
import React from 'react';
import {typographies} from '../../../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../../../assets/styles/colors.style.asset';
import {
  displayTextWithMentions,
  formatDate,
} from '../../../../../../utilities/helper.utility';
import {
  customMargin,
  customPadding,
} from '../../../../../../assets/styles/global.style.asset';
import rs from '../../../../../../assets/styles/responsiveSize.style.asset';
import {noteInterface} from '../../../../../../services/formatter/note.formatter';

const NoteItem: React.FC<{
  item: noteInterface;
  index: number;
}> = ({item = {}}) => {
  const {name, createdAt, description} = item;
  const modifiedMentionText = () => {
    const ary = displayTextWithMentions(description) || [];
    let result = [];
    const length = ary?.length;
    for (let i = 0; i < length; i++) {
      let replaced: string = '';
      let part = '';
      if (ary[i].match('@')) {
        replaced = ary[i];
      } else {
        part = ary[i];
      }
      result.push(
        <Text
          style={[typographies.bodySmallBold, {color: colors.gray1}]}
          key={i}>
          {replaced}
        </Text>,
        <Text
          style={[typographies.bodySmall, {color: colors.gray4}]}
          key={`${i}abc`}>
          {part}
        </Text>,
      );
    }
    return (
      <Text
        style={[typographies.bodySmall, {color: colors.gray4}]}
        numberOfLines={3}>
        {result}
      </Text>
    );
  };
  return (
    <View
      style={{
        ...customPadding(20, 20, 20, 20),
        backgroundColor: colors.white,
        borderRadius: rs(12),
      }}>
      <Text style={typographies.bodyXSBold}>{name}</Text>
      <Text style={[typographies.bodyXS, {...customMargin(0, 0, 12)}]}>
        {formatDate(createdAt, 'MMM DD, YYYY', '', true)}
      </Text>
      {modifiedMentionText()}
    </View>
  );
};

export default NoteItem;

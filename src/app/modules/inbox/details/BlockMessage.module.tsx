import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {messages} from '../../../assets/js/messages.message';
import {typographies} from '../../../assets/styles/typographies.style.asset';

const BlockMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={[typographies.bodySmallBold, {color: colors.white}]}>
        {messages.canNotReply}
      </Text>
      <Text style={[typographies.bodyXS, {color: colors.white}]}>
        {messages.contactBlockOrUnsub}
      </Text>
    </View>
  );
};
export default BlockMessage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: 84,
    backgroundColor: colors.gray4,
    overflow: 'hidden',
  },
});

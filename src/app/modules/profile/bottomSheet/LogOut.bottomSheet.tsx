import {View, Text} from 'react-native';
import React from 'react';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';
import {titles} from '../../../assets/js/titles.message';
import CustomButton from '../../../components/core/button/CustomButton.core.component';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {messages} from '../../../assets/js/messages.message';
import {buttons} from '../../../assets/js/buttons.message';

const LogOutBottomSheet = () => {
  return (
    <View style={{...customPadding(0, 20, 40, 20)}}>
      <Text style={[typographies.headingLarge, {...customMargin(12, 0, 8)}]}>
        {titles.logOut}
      </Text>
      <Text
        style={[
          typographies.bodyMedium,
          {color: colors.gray4, ...customMargin(0, 0, 28)},
        ]}>
        {messages.logOutMessage}
      </Text>
      <CustomButton
        text={buttons.goBack}
        onPress={() => {
          global.showBottomSheet({flag: false});
        }}
        classes="secondary"
      />
      <CustomButton
        text={titles.logOut}
        style={{...customMargin(12)}}
        onPress={() => {
          global.showBottomSheet({flag: false});
          global.logout();
        }}
        classes="error"
      />
    </View>
  );
};

export default LogOutBottomSheet;

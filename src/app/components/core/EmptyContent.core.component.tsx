import {View, Text, ViewStyle, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';

const EmptyContent: React.FC<{
  text?: string;
  style?: ViewStyle;
  forLoading?: boolean;
  textStyle?: ViewStyle;
  loadingColor?: string;
}> = ({
  text = '',
  style = {},
  forLoading = false,
  loadingColor = colors.primary,
  textStyle = {},
}) => {
  return (
    <View style={[globalStyles.centerView, style]}>
      {forLoading ? (
        <ActivityIndicator size={'large'} color={loadingColor} />
      ) : (
        <Text style={[typographies.bodyMedium, textStyle]}>{text}</Text>
      )}
    </View>
  );
};

export default EmptyContent;

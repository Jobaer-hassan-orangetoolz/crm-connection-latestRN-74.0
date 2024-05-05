import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {colors} from '../../assets/styles/colors.style.asset';
import {config} from '../../../config';
import {activityHeight} from '../../utilities/helper.utility';

const CustomActivityBar: React.FC<any> = ({bgColor = colors.transparent}) => {
  const style = styles(config.activityHeight, bgColor);
  return <View style={style.container} />;
};
export default CustomActivityBar;

const styles = (height: any, bgColor: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      height: Platform.OS === 'ios' ? height : activityHeight(),
    },
  });

import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {webViewStyle} from './style/webView.style';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import LockIcon from '../../../assets/icons/Lock.icon.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import OpenTabIcon from '../../../assets/icons/OpenTab.icon.asset';

const WebViewHeader = ({title = '', loading = 0, url = ''}) => {
  const navigation = useCustomNavigation();
  const styles = webViewStyle;
  const handleOpenURL = async () => {
    try {
      url && (await Linking.openURL(url));
    } catch (e) {
      /* Could not open URL */
      /* TODO: you can show message to user for invalid url */
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.center, globalStyles.flex1]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={{...customPadding(5, 5, 5)}}>
              <LeftArrowIcon />
            </View>
          </TouchableOpacity>
          <View style={{...customMargin(0, 10, 0, 11)}}>
            <Text
              style={[typographies.bodyMediumBold, styles.title]}
              numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.url}>
              <LockIcon height={rs(14)} width={rs(14)} fill={colors.gray2} />
              <Text
                style={[typographies.bodyXS, styles.urlText]}
                numberOfLines={1}>
                {url}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleOpenURL}
          style={{...customMargin(0, 0, 0, 20)}}>
          <View style={{...customPadding(5, 0, 5, 5)}}>
            <OpenTabIcon />
          </View>
        </TouchableOpacity>
      </View>
      <ProgressBar width={`${loading * 100}%`} />
    </>
  );
};
export default WebViewHeader;

const ProgressBar = ({
  width = '10%',
  style = {},
  color,
}: {
  width?: string;
  style?: ViewStyle;
  color?: string;
}) => {
  const styles = progressBarStyle(width, color);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.progressBar} />
    </View>
  );
};
const progressBarStyle = (width?: string | any, color?: string | undefined) =>
  StyleSheet.create({
    container: {
      height: 3,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.gray2,
      borderRadius: 30,
    },
    progressBar: {
      backgroundColor: color ? color : colors.primary,
      borderRadius: 30,
      width: width,
    },
  });

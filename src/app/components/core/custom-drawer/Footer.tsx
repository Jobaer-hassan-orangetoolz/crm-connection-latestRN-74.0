import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {styles} from './CustomDrawer.core.component';
import {screens} from '../../../routes/routeName.route';
import ImagePreview from '../ImagePreview.core.component';
import {useSelector} from 'react-redux';
import {authStates} from '../../../states/allSelector.state';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {globalStyles} from '../../../assets/styles/global.style.asset';

const Footer = ({
  hideComponent,
  showImage = true,
  hasTopBorder = true,
  hasBottomBorder = false,
}: any) => {
  const navigation = useCustomNavigation();
  const {userInfo} = useSelector(authStates) || {};
  const {name, image, email} = userInfo || {
    name: '',
    image: '',
    email: '',
  };
  return (
    <View
      style={[
        styles.footer,
        hasTopBorder ? styles.topBorder : {},
        hasBottomBorder ? styles.bottomBorder : {},
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screens.profile as never);
          hideComponent();
        }}
        activeOpacity={0.7}
        style={styles.profileCont}>
        {showImage && (
          <ImagePreview
            resizeMode={'cover'}
            source={{uri: image}}
            styles={styles.profileImage}
            borderRadius={500}
          />
        )}
        <View style={globalStyles.flexShrink1}>
          <Text
            numberOfLines={1}
            style={[typographies.bodyMediumBold, {color: colors.drawer.text}]}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={[typographies.bodyXS, {color: colors.drawer.text}]}>
            {email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Footer;

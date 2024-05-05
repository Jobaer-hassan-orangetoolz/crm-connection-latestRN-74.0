import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './CustomDrawer.core.component';
import ImagePreview from '../ImagePreview.core.component';
import {imageProperties} from '../../../assets/styles/properties.asset';
import {customUseSelector} from '../../../packages/redux.package';
import {authStates} from '../../../states/allSelector.state';

const FooterAgency = () => {
  const {userInfo} = customUseSelector(authStates);
  return (
    <View style={[styles.footer, styles.topBorder, styles.footerAlt]}>
      <View style={[styles.profileCont, styles.footerAgency]}>
        <View style={[styles.logoPreview, styles.logoPreviewAlt]}>
          <ImagePreview
            styles={styles.logo}
            source={{uri: userInfo.agencyLogo}}
            resizeMode={imageProperties.resizeMode.stretch}
          />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.agencyName}>
            {userInfo.agencyName}
          </Text>
          {/* <Text
            numberOfLines={1}
            style={[typographies.bodyXS, {color: colors.white}]}>
            {config.agencyNumber}
          </Text>
          <Text
            numberOfLines={1}
            style={[typographies.bodyXS, {color: colors.white}]}>
            {config.agencyEmail}
          </Text> */}
        </View>
      </View>
    </View>
  );
};
export default FooterAgency;

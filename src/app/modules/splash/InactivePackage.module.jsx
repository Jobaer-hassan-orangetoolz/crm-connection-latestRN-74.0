import React from 'react';
import {Text, View} from 'react-native';
import Container from '../../layouts/Container.layout';
import {freezeScreenStyles as styles} from './styles/freezeScreen.style';
import {titles} from '../../assets/js/titles.message';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {customUseSafeAreaInsets} from '../../packages/safeAreaContext.package';
import {placeholders} from '../../assets/js/placeholders.message';
import {config} from '../../../config';
import {messages} from '../../assets/js/messages.message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';
import CustomButton from '../../components/core/button/CustomButton.core.component';
import {customMargin} from '../../assets/styles/global.style.asset';
const InactivePackage = ({route}) => {
  const {top} = customUseSafeAreaInsets();
  const navigation = useCustomNavigation();
  const handlePressLink = () => {
    navigation.navigate(screens.webView, {
      title: route?.params?.title,
      url: route?.params?.domain,
    });
  };
  return (
    <Container
      containerStyle={globalStyles.relativeContainer}
      showHeader={false}>
      <View style={globalStyles.relativeContainer}>
        <View style={[styles.bodyWrp, {paddingTop: top + 20}]}>
          <Text style={typographies.headingLarge}>{titles.dashboard}</Text>
          <View style={styles.noInfo}>
            <Text>{placeholders.noData}</Text>
          </View>
        </View>
        <View style={styles.backdrop} />
      </View>
      <View style={styles.bottomWrp}>
        <View style={styles.bottomHeader}>
          <Text style={typographies.bodyMediumBold}>
            {messages.inactiveHeader}
          </Text>
          <Text style={styles.des}>{messages.inactiveDes}</Text>
          <View style={styles.linkView}>
            <Text style={styles.des}>{messages.linkTitle}</Text>
            <TouchableOpacity
              onPress={() => {
                handlePressLink();
              }}>
              <Text style={styles.desLink}>
                {route?.params?.domain || config.webUrl}
              </Text>
            </TouchableOpacity>
            <CustomButton
              text={titles.logOut}
              style={{...customMargin(25)}}
              onPress={() => {
                global.logout();
              }}
              classes="error"
            />
          </View>
        </View>
      </View>
    </Container>
  );
};
export default InactivePackage;

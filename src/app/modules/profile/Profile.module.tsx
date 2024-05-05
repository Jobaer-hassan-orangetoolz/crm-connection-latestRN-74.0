import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Container from '../../layouts/Container.layout';
import IconWithTextHeader from '../../components/core/headers/IconWithTextHeader.app.component';
import {titles} from '../../assets/js/titles.message';
import {colors} from '../../assets/styles/colors.style.asset';
import ImagePreview from '../../components/core/ImagePreview.core.component';
import {
  customMargin,
  customPadding,
} from '../../assets/styles/global.style.asset';
import DetailsCard from '../contact/details/component/DetailsCard.component';
import UserIcon from '../../assets/icons/User.icon.asset';
import EmailIcon from '../../assets/icons/Email.icon.asset';
import CallIcon from '../../assets/icons/Call.icon.asset';
import {formatPhoneNumber} from '../../utilities/helper.utility';
import CompanyIcon from '../../assets/icons/Comapany.icon.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import LocationIcon from '../../assets/icons/Location.icon.asset';
import WebIcon from '../../assets/icons/Web.icon.asset';
import LinkIcon from '../../assets/icons/Link.icon.asset';
import {profileStyles as styles} from './styles/profile.styles';
import EditIcon from '../../assets/icons/Edit.icon.asset';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';
import LogOutBottomSheet from './bottomSheet/LogOut.bottomSheet';
import {config} from '../../../config';
import ImagePickerBottomSheet from '../../components/app/ImagePicker.bottomSheet.app.component';
import useProfile from './hook/useProfile.hook';
const Profile: React.FC = () => {
  const navigation = useCustomNavigation<any>();
  const {
    failed,
    success,
    name,
    image,
    company,
    number,
    email,
    address,
    url,
    isShowAppointmentUrl,
    handleNavigate,
  } = useProfile();
  return (
    <Container bg={colors.secondary} statusBarBg={colors.secondary}>
      <IconWithTextHeader text={titles.myProfile} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() =>
            global.showBottomSheet({
              flag: true,
              component: ImagePickerBottomSheet,
              componentProps: {success, failed},
            })
          }
          style={styles.imageContainer}>
          <ImagePreview
            source={{uri: image}}
            styles={styles.image}
            borderRadius={500}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              global.showBottomSheet({
                flag: true,
                component: ImagePickerBottomSheet,
              })
            }
            style={styles.editIcon}>
            <EditIcon width={16} height={16} fill={colors.white} />
          </TouchableOpacity>
        </Pressable>
        <View style={styles.container}>
          <View style={{...customMargin(68)}}>
            <DetailsCard
              title={titles.name}
              text={name}
              always={true}
              onPress={() => handleNavigate(screens.updateProfile, titles.name)}
              icon={<UserIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.Email}
              always={true}
              text={email}
              rightIcon={false}
              disabled={true}
              icon={<EmailIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.phone}
              always={true}
              onPress={() =>
                handleNavigate(screens.updateProfile, titles.phone)
              }
              text={formatPhoneNumber(number)}
              icon={<CallIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.company}
              always={true}
              onPress={() =>
                handleNavigate(screens.updateProfile, 'company_name')
              }
              text={company}
              icon={<CompanyIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.website}
              always={true}
              onPress={() => handleNavigate(screens.updateProfile, titles.url)}
              text={url}
              icon={<WebIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.address}
              always={true}
              onPress={() =>
                handleNavigate(screens.updateProfile, titles.address)
              }
              text={address}
              icon={<LocationIcon fill={colors.primary} />}
            />
            <DetailsCard
              title={titles.appointmentURL}
              always={true}
              onPress={() => handleNavigate(screens.updateAppointment)}
              text={isShowAppointmentUrl ? 'Yes' : 'No'}
              icon={<LinkIcon fill={colors.primary} />}
            />
          </View>
        </View>
        <View style={{...customPadding(12, 0, 20)}}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{...customPadding(10, 20, 10, 20)}}
            onPress={() =>
              navigation.navigate(screens.webView, {
                title: config.title,
                url: config.termsUrl,
              })
            }>
            <Text style={typographies.bodyMediumBold}>
              {titles.termsAndCond}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{...customPadding(10, 20, 10, 20)}}
            onPress={() =>
              navigation.navigate(screens.webView, {
                title: config.title,
                url: config.privacyUrl,
              })
            }>
            <Text style={typographies.bodyMediumBold}>
              {titles.privacyPolicy}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              global.showBottomSheet({
                flag: true,
                component: LogOutBottomSheet,
              });
            }}
            style={{...customPadding(10, 20, 10, 20)}}>
            <Text style={[typographies.bodyMediumBold, {color: colors.error1}]}>
              {titles.logOut}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;

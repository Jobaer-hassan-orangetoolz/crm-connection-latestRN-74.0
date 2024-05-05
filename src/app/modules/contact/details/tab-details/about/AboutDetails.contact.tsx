/* eslint-disable curly */
import {View} from 'react-native';
import React from 'react';
import {customPadding} from '../../../../../assets/styles/global.style.asset';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import DetailsCard from '../../component/DetailsCard.component';
import EmailIcon from '../../../../../assets/icons/Email.icon.asset';
import {
  checkNameEmpty,
  formatPhoneNumber,
} from '../../../../../utilities/helper.utility';
import CallIcon from '../../../../../assets/icons/Call.icon.asset';
import CampaignIcon from '../../../../../assets/icons/Campaign.icon.asset';
import LocationIcon from '../../../../../assets/icons/Location.icon.asset';
import {titles} from '../../../../../assets/js/titles.message';

const AboutDetailsContact: React.FC<{item: any}> = ({item}) => {
  const {
    email = '',
    number = '',
    company = '',
    address = '',
    city = '',
    zip = '',
    state = '',
    country = '',
  } = item || {};

  const getAddressString = () => {
    const parts = [];
    if (checkNameEmpty(address)) parts.push(address);
    if (checkNameEmpty(city)) parts.push(city);
    if (checkNameEmpty(zip)) parts.push(zip);
    if (checkNameEmpty(state)) parts.push(state);
    if (checkNameEmpty(country)) parts.push(country);
    return parts.join(', ');
  };
  return (
    <View
      style={{
        ...customPadding(8, 0, 8),
        backgroundColor: colors.white,
        borderRadius: rs(12),
      }}>
      {email && (
        <DetailsCard
          title={titles.Email}
          icon={<EmailIcon width={24} height={24} fill={colors.primary} />}
          text={email}
          rightIcon={false}
        />
      )}
      {number && (
        <DetailsCard
          title={titles.phone}
          icon={<CallIcon width={24} height={24} fill={colors.primary} />}
          text={formatPhoneNumber(number)}
          rightIcon={false}
        />
      )}
      {company && (
        <DetailsCard
          title={titles.company}
          icon={<CampaignIcon width={24} height={24} fill={colors.primary} />}
          text={company}
          rightIcon={false}
        />
      )}
      {checkNameEmpty(getAddressString()?.trim()) && (
        <DetailsCard
          title={titles.location}
          icon={<LocationIcon width={24} height={24} fill={colors.primary} />}
          text={getAddressString()}
          rightIcon={false}
        />
      )}
    </View>
  );
};

export default AboutDetailsContact;

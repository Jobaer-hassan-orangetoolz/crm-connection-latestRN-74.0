import {ScrollView} from 'react-native';
import React from 'react';
import AboutDetailsContact from './AboutDetails.contact';
import CustomFieldDetailsContact from './CustomFieldDetails.contact';
import OthersDetailsContact from './OthersDetails.contact';
import {customPadding} from '../../../../../assets/styles/global.style.asset';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import useAboutContact from '../../../hooks/useAboutContact.hook';

const ContactAbout: React.FC<{id: string; item: any}> = ({id = '', item}) => {
  const {customField, customFieldLoading, campaigns, pipeline, tags} =
    useAboutContact(id);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      scrollEventThrottle={2}
      contentContainerStyle={{
        ...customPadding(20, 20, 20, 20),
        gap: rs(20),
      }}>
      <AboutDetailsContact item={item} />
      <OthersDetailsContact
        item={item}
        id={id}
        campaigns={campaigns}
        pipeline={pipeline}
        tags={tags}
        contactDetails={item}
      />
      <CustomFieldDetailsContact
        customField={customField}
        customFieldLoading={customFieldLoading}
      />
    </ScrollView>
  );
};

export default ContactAbout;

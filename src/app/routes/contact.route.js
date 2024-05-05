import React from 'react';
import {screens} from './routeName.route';
import AddContact from '../modules/contact/add/AddContact.module';
import ContactDetails from '../modules/contact/details/ContactDetails.module';
import AddNote from '../modules/contact/details/tab-details/notes/add/AddNote.contact';
import LeadSource from '../modules/contact/details/tab-details/about/lead-source/LeadSource.contact';
import LeadOwner from '../modules/contact/details/tab-details/about/lead-owner/LeadOwner.contact';
import CustomFieldList from '../modules/contact/add/custom-fields/CustomFieldList.module';
import ContactTags from '../modules/contact/details/tab-details/about/contact-tags/Tags.contact';
import ContactCampaign from '../modules/contact/details/tab-details/about/contact-campaign/ContactCampaign.contact';
import ContactPipeline from '../modules/contact/details/tab-details/about/contact-pipeline/ContactPipeline.contact';
import AddCampaignToContact from '../modules/contact/details/tab-details/add-contact/AddCampaignToContact.module';

const contactRoutes = Stack => {
  return [
    <Stack.Screen name={screens.addContact} component={AddContact} key={0} />,
    <Stack.Screen
      name={screens.contactDetails}
      component={ContactDetails}
      key={2}
    />,
    <Stack.Screen name={screens.addNote} component={AddNote} key={3} />,
    <Stack.Screen name={screens.leadSource} component={LeadSource} key={4} />,
    <Stack.Screen name={screens.leadOwner} component={LeadOwner} key={5} />,
    <Stack.Screen
      name={screens.customFieldList}
      component={CustomFieldList}
      key={6}
    />,
    <Stack.Screen name={screens.contactTags} component={ContactTags} key={7} />,
    <Stack.Screen
      name={screens.contactCampaign}
      component={ContactCampaign}
      key={8}
    />,
    <Stack.Screen
      name={screens.contactPipeline}
      component={ContactPipeline}
      key={9}
    />,
    <Stack.Screen
      name={screens.addCampaignToContact}
      component={AddCampaignToContact}
      key={10}
    />,
  ];
};

export default contactRoutes;

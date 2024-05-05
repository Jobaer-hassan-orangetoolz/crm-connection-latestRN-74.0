import React from 'react';
import {screens} from './routeName.route';
import CampaignDetails from '../modules/campaign/campaign-details/CampaignDetails.module';
import CampaignContactList from '../modules/campaign/contact-list/CampaignContactList.module';
import AddContactToCampaign from '../modules/campaign/contact-list/AddContactToCampaign.module';
import SelectCampaign from '../modules/campaign/contact-list/SelectCampaign.module';

const campaignRoutes = Stack => {
  return [
    <Stack.Screen
      name={screens.campaignsDetails}
      component={CampaignDetails}
      key={0}
    />,
    <Stack.Screen
      name={screens.campaignContactList}
      component={CampaignContactList}
      key={1}
    />,
    <Stack.Screen
      name={screens.selectCampaign}
      component={SelectCampaign}
      key={2}
    />,
    <Stack.Screen
      name={screens.addContactToCampaign}
      component={AddContactToCampaign}
      key={3}
    />,
  ];
};

export default campaignRoutes;

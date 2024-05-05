import React from 'react';
import {screens} from './routeName.route';
import EachConversation from '../modules/inbox/details/EachConversation.module';
import NewEmail from '../modules/inbox/email/NewEmail.module';
import QuickReply from '../modules/inbox/quick-reply/QuickReply.module';
import EachMessageDetails from '../modules/inbox/details/EachMessageDetails.module';
import FullMessage from '../modules/inbox/details/FullMessage.module';

const inboxRoutes = Stack => {
  return [
    <Stack.Screen
      name={screens.eachConversation}
      component={EachConversation}
      key={0}
    />,
    <Stack.Screen name={screens.newEmail} component={NewEmail} key={1} />,
    <Stack.Screen name={screens.quickReply} component={QuickReply} key={2} />,
    <Stack.Screen
      name={screens.eachMessageDetails}
      component={EachMessageDetails}
      key={3}
    />,
    <Stack.Screen name={screens.fullMessage} component={FullMessage} key={4} />,
  ];
};

export default inboxRoutes;

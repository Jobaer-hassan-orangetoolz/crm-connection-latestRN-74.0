/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {
  createChannel,
  displayNotification,
  notifeeEventListener,
} from '../../../packages/notifee/notifee.Index';
import {notificationPermission} from '../../../utilities/permission.utility';
import {
  addMessagingEventListener,
  registerDeviceForRemoteMessages,
  requestFBPermission,
} from '../../../packages/firebase/firebase.index';
import {customUseDispatch} from '../../../packages/redux.package';
import {
  getTeamUser,
  getUserCustomField,
  getUserLeadSource,
  getUserStandardPersonalized,
  getUserVirtualNumber,
  saveGCMToken,
  storeUnreadCount,
  updateUnreadCount,
} from '../../../states/features/user/user.slice';
import {screens} from '../../../routes/routeName.route';
import {
  contactTitle,
  formatPhoneNumber,
  htmlEntityReplace,
  isEmpty,
  // isEmpty,
} from '../../../utilities/helper.utility';
import useCallHook from './useCall.hook';
import {
  readUnreadMessage,
  storeNewMessage,
} from '../../../states/features/inbox/inbox.slice';
import inboxThreadModel, {
  currentContactId,
  withoutIds,
} from '../../../services/models/InboxThread.model';
import {storeNewMessageInConversation} from '../../../states/features/inbox/eachMessage.slice';
// import {customMessaging} from '../../../packages/firebase/firebase.package';
// import {customNotifee} from '../../../packages/notifee/notifee.Package';
import {Keyboard} from 'react-native';

export const selectedDrawer = {
  value: '',
};

const useHome = () => {
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const drawerRef = useRef<any>(null);
  const androidNotificationChannelRef = useRef<any>(null);
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const {initCallEnvironment} = useCallHook();

  useEffect(() => {
    if (isShowDrawer) {
      drawerRef?.current?.show();
    }
  }, [isShowDrawer]);
  useEffect(() => {
    initialSetup();
    // try catch is not needed now..if needed then we use this..don't delete.
    // try {
    //   customMessaging()
    //     .getInitialNotification()
    //     .then(async (remoteMessage: any) => {
    //       console.log('remote message', remoteMessage);
    //       const {
    //         data: {contactInfo, type} = {contactInfo: '', type: ''},
    //         notification: {title} = {title: ''},
    //       } = remoteMessage || {};
    //       const contact = contactInfo ? JSON.parse(`${contactInfo}`) : '';
    //       if (!isEmpty(contact)) {
    //         navigation.navigate(screens.eachConversation, {
    //           from: 'notification',
    //           contact: contact,
    //           type: parseInt(`${type}`),
    //           id: contact.id,
    //           name: title,
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       try {
    //         customNotifee.cancelAllNotifications();
    //       } catch {}
    //     });
    // } catch (err) {}
  }, []);

  const initialSetup = async () => {
    createChannel(androidNotificationChannelRef);
    const fBPermission = await requestFBPermission();
    if (fBPermission) {
      await registerDeviceForRemoteMessages();
      dispatch(saveGCMToken());
      addMessagingEventListener((msg: any, _type: any = 'foreground') => {
        if (msg && msg.notification) {
          const {
            notification: {body, title},
            data: {contactInfo, type, message},
          } = msg;
          let contact = JSON.parse(contactInfo);
          if (_type === 'foreground') {
            displayNotification({
              channelId: androidNotificationChannelRef.current,
              title: contactTitle(contact, type),
              body: htmlEntityReplace(body),
              subtitle:
                type === inboxThreadModel.messageType.sms ||
                type === inboxThreadModel.messageType.mms
                  ? formatPhoneNumber(contact.number)
                  : contact.email,
              data: msg.data,
            });
          } else if (_type === 'openApp') {
            navigation.navigate(screens.eachConversation, {
              from: 'notification',
              contact: contact,
              type: parseInt(`${type}`),
              id: contact.id,
              name: title,
            });
          } else if (_type === 'killed') {
            if (!isEmpty(contact)) {
              navigation.navigate(screens.eachConversation, {
                from: 'notification',
                contact: contact,
                type: parseInt(`${type}`),
                id: contact.id,
                name: title,
              });
              dispatch(
                readUnreadMessage({
                  status: true,
                  contactId: contact.id,
                  index: 0,
                  state: 'killed',
                }),
              );
            }
          }
          const item = {...contact, type: type, message: message};

          if (!withoutIds.includes(item.id)) {
            withoutIds.push(item.id);
          }
          if (currentContactId.id === item.id) {
            dispatch(
              storeNewMessageInConversation(
                inboxThreadModel.notificationConversation({item}),
              ),
            );
            if (_type !== 'killed') {
              dispatch(
                readUnreadMessage({
                  status: true,
                  contactId: item.id,
                  index: 0,
                }),
              );
            }
          } else {
            dispatch(
              storeNewMessage(inboxThreadModel.notificationMessage({item})),
            );
            dispatch(updateUnreadCount(1));
          }
        }
      });
    }
    const isGivingPermission = await notificationPermission();
    if (isGivingPermission) {
      notifeeEventListener((detail: any) => {
        const {
          notification: {
            data: {contactInfo, type},
            title,
          },
        } = detail;
        const contact = JSON.parse(`${contactInfo}`);
        if (contact) {
          navigation.navigate(screens.eachConversation, {
            from: 'notification',
            contact: contact,
            type: parseInt(`${type}`),
            id: contact.id,
            name: title,
          });
          dispatch(
            readUnreadMessage({
              status: true,
              contactId: contact.id,
              index: 0,
            }),
          );
        }
      });
    }
    dispatch(storeUnreadCount());
    dispatch(getTeamUser());
    dispatch(getUserLeadSource());
    dispatch(getUserVirtualNumber());
    dispatch(getUserCustomField());
    dispatch(getUserStandardPersonalized());
    initCallEnvironment();
  };

  const handleTabClick = (screen: any, flag?: boolean) => {
    try {
      Keyboard.dismiss();
    } catch (error) {}
    if (screen === 'drawer') {
      setIsShowDrawer(flag);
    } else if (screen === screens.add) {
      navigation.navigate(screens.addContact as never);
    } else if (screen === screens.menu) {
      setIsShowDrawer(true);
    } else if (screen === screens.callKeyboard) {
      navigation.navigate(screens.callKeyboard as never);
    }
  };
  return {
    drawerRef,
    handleTabClick,
    isShowDrawer,
  };
};
export default useHome;

import {momentTimezone} from '../../packages/momentTimezone.package';
import {userLocalTimezone} from './_Timezone.modal';

class InboxModel {
  readStatus = {
    unRead: 0,
    read: 1,
  };
  messageType = {
    sms: 1,
    mms: 2,
    voice: 3,
    email: 4,
    call: 5,
    activity: 6,
    outgoingCall: 7,
    webhook: 9,
    stage: 10,
    appointment: 12,
    callBridge: 13,
    videoEmail: 14,
    chat: 15,
    note: 16,
    general: 20,
    postCard: 21,
    greetingCard: 22,
    gift: 23,
    letter: 24,
    callRecord: 25,
    formResponse: 26,
    thanksIoGreetingCard: 27,
    appointmentReminder: 28,
    thanksIoGift: 29,
    smartFormResponse: 30,
  };
  inOutType = {
    incoming: 1,
    outgoing: 2,
  };
  status = {
    pending: 0,
    success: 1,
    fail: 2,
    sent: 3,
    undelivered: 4,
    accepted: 6,
    deleted: 6,
  };
  backendStatus = {
    success: 1,
    failed: 0,
    pending: 2,
    deleted: 6,
  };
  inboxListTypes = [
    this.messageType.sms,
    this.messageType.mms,
    this.messageType.email,
    this.messageType.call,
  ];
  inboxTab = {
    all: 1,
    archived: 2,
    favourite: 3,
    recent: 'recent',
    unread: 4,
    // read: 4,
  };
  notificationMessage = ({item}: any) => {
    return {
      messageType: item?.type,
      message: item?.message,
      subject: item?.subject,
      contactInfo: {
        firstName: item?.firstName,
        lastName: item?.lastName,
        email: '',
        number: item?.number,
        isFavourite: false,
        id: item?.id,
      },
      lastCommunicatedAt: momentTimezone().tz(userLocalTimezone.timezone).utc(),
      contact_id: item?.id,
      id: '',
      isRead: 0,
    };
  };
  notificationConversation = ({item}: any) => {
    return {
      id: item.id,
      contentType: parseInt(item?.type, 10),
      message: item?.message,
      messageSubject: item?.subject || '',
      from: item?.number,
      inOut: 1,
      timelineCreatedAt: item.createdAt,
      status: item?.status,
      fileUrl: item?.fileUrl || null,
      attachment: item?.attachment || null,
    };
  };
  outgoingConversation = ({item}: any) => {
    return {
      id: item.contact_id,
      contentType: item.content_type,
      message: item?.message,
      subject: item?.message_subject || '',
      from: item?.virtual_number || item?.email || item?.from,
      inOut: item.in_out,
      createdAt: new Date(),
      status: 1,
    };
  };
}
export const inboxIdObj = <any>{};
export const withoutIds = <any>[];
export const currentContactId = <any>{
  id: -1,
};
export let contactDetails: any = {};
export const virtualNumberObject: any = {};
export default new InboxModel();

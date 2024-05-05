export interface inboxItemTypes {
  id: string | number;
  inOut: boolean | number;
  isRead: boolean | number;
  from?: string | number | null;
  virtualNumberId?: string | number | null;
  message: string | null;
  subject?: string | null;
  messageType: string | number;
  contact_id?: string | number;
  lastCommunicatedAt: string | null;
  contact?: inboxContact;
  contactInfo?: inboxContact;
}
export interface inboxContact {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  number: string | null;
  email?: string | null; //TODO: need to get from backend api
  isArchived?: string | boolean | number | null;
  isFavourite?: string | boolean | number | null;
  userId: any;
  source: number | string;
}

export interface eachMessageItemType {
  contactId: number;
  contactName: string;
  contactEmail: string;
  contactNumber: number;
  contactOwnerId: number;
  conversationCreatedBy: number;
  messageType: number;
  inOut: number;
  status: string;
  message: string;
  subject: string;
  failedReason: string;
  isArchived: boolean;
  isFavorite: boolean;
  from: number;
  to: number;
  time: string;
  fileUrl: string;
  attachmentFiles: string;
}

const conversationFormatter = (item: any) => {
  return {
    id: item.id || item.timelineId,
    contentType: item.contentType,
    content: item.content,
    message: item.message,
    subject: item.subject || item.messageSubject,
    from: item.from || null,
    inOut: item.inOut,
    timelineCreatedAt: item.createdAt,
    virtualNumberId: item.virtualNumberId,
    campaign_send_response: item.campaign_send_response,
    user: item.user,
    virtual_number: item.virtual_number,
    error_message: item.error_message,
    status: item.status,
    fileUrl: item.fileUrl,
    attachment: item.attachments,
  };
};

export {conversationFormatter};

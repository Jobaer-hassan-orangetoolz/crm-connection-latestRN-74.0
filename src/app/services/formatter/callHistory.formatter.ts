import {checkNameEmpty} from '../../utilities/helper.utility';

export interface callHistoryItemInterface {
  timelineId: number;
  contactId: number;
  contact_id: number;
  firstName: string | null;
  lastName: string | null;
  contactNumber: string;
  callDirection: number;
  createdAt: string;
  callDuration: string | number;
  status: number; //for missed call, received call
  from: string | null; //based on call direction
  virtualNumberId: string | null;
  fileUrl: string | null;
  message: string | null;
  /* front end */
  count: number;
  isSeparator: boolean;
  title: string;
}
export interface callHistoryInterface {
  name: string;
  contactId: number;
  type: number;
  number: string;
  date: string;
}
const getName = (firstName: string = '', lastName: string = '') => {
  return (checkNameEmpty(firstName) + ' ' + checkNameEmpty(lastName))?.trim();
};
const callHistoryFormatter = (item: any) => {
  return {
    name: getName(item.firstName, item.lastName),
    contactId: item.contactId || item.contact_id,
    type: item.callDirection,
    number: item.contactNumber || item.from,
    date: item.createdAt,
    contact: item.contact,
    count: item.count || 0,
    callDuration: item.callDuration || 0,
  };
};
export {callHistoryFormatter};

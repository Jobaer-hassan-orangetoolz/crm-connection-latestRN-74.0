import {checkNameEmpty} from '../../utilities/helper.utility';

export interface contactItemInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  number?: string | null;
  isBlocked?: boolean;
  isUnsubscribed?: boolean;
  dealValue?: string | number;
  contactId?: number;
  lastNumber?: number;
}
export interface contactInterface {
  name?: string | null | undefined;
  id: string;
  email?: string | null;
  number?: string | null;
  isBlock?: boolean;
  isUnsubscribe?: boolean;
  dealValue?: string | number;
  contactId?: number;
  lastNumber?: number;
}

const getName = (firstName: string = '', lastName: string = '') => {
  return (checkNameEmpty(firstName) + ' ' + checkNameEmpty(lastName))?.trim();
};

const contactFormatter = (item: contactItemInterface) => {
  return {
    id: item.id,
    name: getName(item.firstName, item.lastName),
    email: item.email,
    number: item.number,
    dealValue: item.dealValue || 0,
    contactId: item?.contactId,
    lastNumber: item?.lastNumber,
  };
};
const contactDetailsFormatter = (item: any) => {
  return {
    ...item,
    name: getName(item.firstName, item.lastName),
  };
};
export {contactFormatter, contactDetailsFormatter};

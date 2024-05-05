import {checkNameEmpty} from '../../utilities/helper.utility';

export interface stageDealItemInterface {
  title: string;
  id: number;
  bgColor: string;
  dealValue: number;
  estimate_closing_date: string;
  firstName: string;
  lastName: string;
  email: string | null;
  number: string | null;
  contactId: number;
  status: number;
  [key: string]: any;
}
export interface stageDealInterface {
  title: string;
  id: number;
  bgColor: string;
  dealValue: number;
  closeDate: string;
  name: string;
  email: string | null;
  number: string | null;
  contactId: number;
  status: number;
  [key: string]: any;
}
const checkColor = (color: string) => {
  const has = color?.startsWith('#');
  if (has) {
    return color;
  } else {
    return '#' + color;
  }
};
const getName = (firstName: string = '', lastName: string = '') => {
  return (checkNameEmpty(firstName) + ' ' + checkNameEmpty(lastName))?.trim();
};
const stageDealFormatter = (
  item: stageDealItemInterface,
): stageDealInterface => {
  return {
    title: item.title,
    id: item.id,
    bgColor: checkColor(item.bgColor),
    dealValue: item.dealValue,
    closeDate: item.estimate_closing_date,
    name: getName(item.firstName, item.lastName),
    email: item.email,
    number: item.number,
    contactId: item.contactId,
    status: item.status,
    ...item,
  };
};

export {stageDealFormatter};

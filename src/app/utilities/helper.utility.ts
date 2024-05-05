/* eslint-disable no-bitwise */
import {Alert} from 'react-native';
import {
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  WINDOW_HEIGHT,
} from '../assets/js/core.data';
import {momentTimezone} from '../packages/momentTimezone.package';
import moment from 'moment-timezone';
import {userLocalTimezone} from '../services/models/_Timezone.modal';
import {decode} from 'html-entities';

/* for alert */
const showAlertWithOneAction = (params: any) => {
  const core = {
    title: '',
    body: '',
    okButtonText: 'OK',
    onPressAction: () => {},
  };
  const data = {...core, ...params};
  const {title, body, okButtonText, onPressAction} = data;
  Alert.alert(
    title,
    body,
    [{text: okButtonText, onPress: () => onPressAction('confirm')}],
    {userInterfaceStyle: 'dark'},
  );
};
/* alert end */
const formatDate = (
  date: string = '',
  formatter?: string | any,
  timezone?: string | any,
  utc?: boolean,
) => {
  if (utc) {
    const originalTime = momentTimezone.utc(date);
    const userTimezone = userLocalTimezone.timezone;
    return originalTime
      .tz(userTimezone)
      .format(formatter || 'MMM-Do, YYYY hh:mm:ss A');
  } else {
    return momentTimezone
      .tz(date, timezone)
      .format(formatter || 'MMM-Do, YYYY hh:mm:ss A');
  }
};
const formatDataWithObject = (
  date: string = '',
  objectFormatter?: string,
  formatter?: string,
  utc?: boolean,
) => {
  if (utc) {
    const originalTime = momentTimezone.utc(
      date,
      objectFormatter || 'HH:mm:ss',
    );
    const userTimezone = userLocalTimezone.timezone;
    return originalTime.tz(userTimezone).format(formatter || 'HH:mm:ss');
  }
  return momentTimezone(date, objectFormatter || 'HH:mm:ss').format(
    formatter || 'HH:mm:ss',
  );
};
const getHumanReadableTime = (date: string = '', timezone?: string | any) => {
  let utcCutoff = momentTimezone.utc(date, 'YYYYMMDD HH:mm:ss');
  return utcCutoff?.clone()?.tz(timezone)?.fromNow();
};
const getTimeFromMS = (time: any) => {
  let formatedTime = moment(time);
  return formatedTime.fromNow();
};
const showAlertWithTwoActions = (params: {
  title: string;
  body: string;
  okButtonText?: string;
  onPressAction: (props: any) => void;
  cancelButton?: string;
}) => {
  const core = {
    title: '',
    body: '',
    okButtonText: 'OK',
    onPressAction: () => {},
    cancelButton: 'Cancel',
  };
  const data = {...core, ...params};
  const {title, body, cancelButton, okButtonText, onPressAction} = data;
  Alert.alert(
    title,
    body,
    [
      {
        text: cancelButton,
        onPress: () => onPressAction('cancel'),
        style: 'cancel',
      },
      {text: okButtonText, onPress: () => onPressAction('confirm')},
    ],
    {userInterfaceStyle: 'dark'},
  );
};
const validateBadgeValue = (value: any) => {
  const strValue = value?.toString();
  if (strValue === '9+') {
    return strValue;
  }
  if (strValue > 9) {
    return '9+';
  }
  if (strValue <= 9) {
    return strValue;
  }
};
const isEmpty = (value: any, omitArray: boolean = false) => {
  if (
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    if (omitArray) {
      return false;
    }
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};
const activityHeight = () => {
  const screenHeight = SCREEN_HEIGHT;
  const windowHeight = WINDOW_HEIGHT;
  const statusBarHeight = STATUS_BAR_HEIGHT || 0;
  return screenHeight - (windowHeight + statusBarHeight);
};
const checkObjectEmpty = (obj: object) => {
  if (obj) {
    return JSON.stringify(obj) === '{}';
  }
  return true;
};
const twoColorCompare = (color1: string, color2: string) => {
  const hexaToRgb = (hex: string) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };
  const isSimilar = (rgb1: any[], rgb2: any[]) => {
    const componentNames = ['r', 'g', 'b'];
    for (let i = 0; i < componentNames.length; ++i) {
      if (rgb1?.[i] !== rgb2?.[i]) {
        return false;
      }
    }
    return true;
  };
  return isSimilar(hexaToRgb(color1), hexaToRgb(color2));
};
const getHexaOpacityColorCode = (color?: any, opacity?: any) => {
  return color + Math.round(opacity * 255).toString(16);
};
const formatPhoneNumber = (phoneNumberString: string) => {
  if (isEmpty(phoneNumberString)) {
    return phoneNumberString;
  }
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString;
};
const getFirstCharAt = (value: string) => {
  if (value) {
    return value.charAt(0).toLocaleUpperCase();
  }
  return '';
};
const isEmailValid = (email: string | null | undefined) => {
  const re: any =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
function formatMessageTimestamp(timeString: any) {
  const utcTime = momentTimezone.utc(timeString);
  const timezone = userLocalTimezone.timezone;
  const currentTime = momentTimezone().tz(timezone);
  if (currentTime.isSame(utcTime, 'day')) {
    return utcTime.tz(timezone).format('hh:mm A');
  } else if (currentTime.clone().subtract(1, 'days').isSame(utcTime, 'day')) {
    return 'Yesterday';
  } else {
    return utcTime.tz(timezone).format('DD/MM');
  }
}
const displayTextWithMentions = (inputText: string) => {
  if (inputText === '' || !inputText) {
    return null;
  }
  const findMentions = (val: any) => {
    let reg = /@\[([^\]]+?)\]\(([^\]]+?)\)/gim;
    let indexes = [];
    let match;
    while ((match = reg.exec(val))) {
      indexes.push({
        start: match.index,
        end: reg.lastIndex - 1,
        username: match[1],
        id: match[2],
      });
    }
    return indexes;
  };
  const retLines = inputText?.split('\n');
  const formattedText: any[] = [];
  retLines.forEach((retLine: any) => {
    const mentions = findMentions(retLine);
    if (mentions.length) {
      let lastIndex = 0;
      mentions.forEach((men: any, index: any) => {
        const initialStr = retLine.substring(lastIndex, men.start);
        lastIndex = men.end + 1;
        formattedText.push(initialStr);
        const formattedMention = `@${men.username}`;
        formattedText.push(formattedMention);
        if (mentions.length - 1 === index) {
          const lastStr = retLine.substr(lastIndex);
          formattedText.push(lastStr);
        }
      });
    } else {
      formattedText.push(retLine);
    }
  });
  return formattedText;
};
const debounceHandler = (fn: (props: any) => void, delay: number = 500) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const checkNameEmpty = (value: any) => {
  if (value && value !== 'null' && value !== 'undefined') {
    return value;
  } else {
    return '';
  }
};
const formatStringToArray = (options: any) => {
  if (isEmpty(options)) {
    return [];
  }
  if (Array.isArray(options)) {
    return options;
  }
  if (typeof options === 'string') {
    return options
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/\\/g, '')
      .replace(/"/g, '')
      .replace(/ /g, '')
      .toString()
      .split(',');
  }
  return [];
};
const contactTitle = (contact: any, type = '1') => {
  let title = '';
  if (contact) {
    if (!isEmpty(contact.firstName) && !isEmpty(contact.lastName)) {
      title = contact.firstName + ' ' + contact.lastName;
    } else if (!isEmpty(contact.firstName)) {
      title = contact.firstName;
    } else if (!isEmpty(contact.lastName)) {
      title = contact.lastName;
    } else if (type === '1' || type === '2') {
      title = formatPhoneNumber(contact.number);
    } else {
      title = contact.email;
    }
  }

  return title;
};
const getAvatarText = (first: any, last?: any, email?: any, number?: any) => {
  if (first && typeof first === 'string' && first.length > 0) {
    return first.charAt(0).toLocaleUpperCase();
  } else if (last && typeof last === 'string' && last.length > 0) {
    return last.charAt(0).toLocaleUpperCase();
  } else if (email && typeof email === 'string' && email.length > 0) {
    return email.charAt(0).toLocaleUpperCase();
  } else if (number && typeof number === 'string' && number.length > 0) {
    if (isNumber(number)) {
      return '#';
    }
    return number.charAt(0).toLocaleUpperCase();
  }
  return '-';
};
// const htmlEntityReplace = (string: any) => {
//   if (isEmpty(string)) {
//     return '';
//   }
//   const rex = /(<([^>]+)>)/gi;
//   return string.replace(rex, '');
// };
const timeFormat = (time: any) => {
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;
  let ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};
const reduceInboxMailMessage = (mail: any, limit: any = null) => {
  if (mail !== undefined) {
    if (limit == null) {
      limit = 90;
    }
    mail = `${mail}`;
    if (mail.length > limit) {
      return mail.substring(0, limit).trim() + '...';
    } else {
      return mail;
    }
  } else {
    return '';
  }
};
function isNumber(value: any) {
  const parse = parseInt(value);
  return typeof parse === 'number' && !isNaN(value);
}
const stringIsNumber = (text: string | number) => {
  //   let num = Number(text);
  //   if (isNaN(num)) {
  //     return false;
  //   }
  //   return true;
  return /^\d+$/.test(`${text}`);
};
const checkIsValidNumber = (text: string, country: string = 'usa') => {
  text = text.trim();
  if (country === 'usa') {
    if (!stringIsNumber(text)) {
      return false;
    }
    if (text.length > 11 || text.length < 10) {
      return false;
    }
    if (text.length === 11 && text[0] !== '1') {
      return false;
    }
    return true;
  }
  return false;
};
const wordCount = (text: string, onlyCount: boolean = false) => {
  if (isEmpty(text)) {
    return 0;
  }
  text = text.trim();
  if (onlyCount) {
    return text.split(' ').length;
  }
  return text.split(' ');
};
const getNameData = (text: string) => {
  const counts: any = wordCount(text, false);
  if (counts.length === 0) {
    return {
      firstName: '',
      lastName: '',
    };
  }
  if (counts.length === 1) {
    return {
      firstName: text,
      lastName: '',
    };
  }
  if (counts.length === 2) {
    return {
      firstName: counts[0],
      lastName: counts[1],
    };
  }
  if (counts.length > 2) {
    return {
      firstName: counts.slice(0, 2).join(' '),
      lastName: counts.slice(2).join(' '),
    };
  }
  return {
    firstName: '',
    lastName: '',
  };
};
const conversionRate = (val: any) => {
  const win = isNaN(val.win) ? 0 : val.win,
    lost = isNaN(val.lost) ? 0 : val.lost,
    opened = isNaN(val.opened) ? 0 : val.opened;

  const total = win + lost + opened;
  let rate: string | number = 0;
  if (total > 0) {
    rate = (win / total) * 100;
  }
  return rate;
};
const calculateCash = (amount: number = 0, fixedCount?: number) => {
  var flag = '';
  // 1000 = 1K
  // 1000000 = 1M = 1K * 1000
  // 1M * 1000 = 1B
  // 1B * 1000 = 1T
  if (isEmpty(amount) || isNaN(Number(amount))) {
    return '$' + 0 + flag;
  }
  if (amount >= 1000000000000000000000000) {
    amount = amount / 1000000000000000000000000;
    flag = 'Y';
  }
  if (amount >= 1000000000000000000000) {
    amount = amount / 1000000000000000000000;
    flag = 'Z';
  }
  if (amount >= 1000000000000000000) {
    amount = amount / 1000000000000000000;
    flag = 'E';
  }
  if (amount >= 1000000000000000) {
    amount = amount / 1000000000000000;
    flag = 'P';
  }
  if (amount >= 1000000000000) {
    amount = amount / 1000000000000;
    flag = 'T';
  } else if (amount >= 1000000000) {
    amount = amount / 1000000000;
    flag = 'B';
  } else if (amount >= 1000000) {
    amount = amount / 1000000;
    flag = 'M';
  } else if (amount >= 1000) {
    amount = amount / 1000;
    flag = 'K';
  }
  // return '$' + (Math.round(totalDeal * 100) / 100) + flag
  return '$' + amount.toFixed(fixedCount || 2) + flag;
};
const htmlEntityReplace = (string: any) => {
  if (isEmpty(string)) {
    return '';
  }
  var rex = /(<([^>]+)>)/gi;
  return decode(string).replace(rex, '');
};
export {
  isEmpty,
  activityHeight,
  checkObjectEmpty,
  getFirstCharAt,
  getHexaOpacityColorCode,
  showAlertWithTwoActions,
  showAlertWithOneAction,
  isEmailValid,
  formatMessageTimestamp,
  displayTextWithMentions,
  formatDate,
  formatDataWithObject,
  validateBadgeValue,
  debounceHandler,
  checkNameEmpty,
  formatStringToArray,
  formatPhoneNumber,
  contactTitle,
  getAvatarText,
  reduceInboxMailMessage,
  getHumanReadableTime,
  timeFormat,
  isNumber,
  twoColorCompare,
  checkIsValidNumber,
  stringIsNumber,
  getNameData,
  wordCount,
  conversionRate,
  getTimeFromMS,
  calculateCash,
  htmlEntityReplace,
};

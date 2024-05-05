import {Platform} from 'react-native';

const imageProperties = {
  resizeMode: {
    cover: 'cover',
    contain: 'contain',
    stretch: 'stretch',
    repeat: 'repeat',
    center: 'center',
  },
};
const nativeDriver = (flag = true) => {
  return Platform.OS === 'android' ? flag : false;
};
const statusBar = {
  dark: 'dark-content',
  light: 'light-content',
};
const textInput = {
  keyboard: {
    default: 'default',
    search: 'search',
    numberPad: 'number-pad',
    numeric: 'numeric',
    phonePad: 'phone-pad',
    url: 'url',
  },
  inputMode: {text: 'text', email: 'email', search: 'search'},
  capitalize: {sentences: 'sentences', none: 'none'},
  autoComplete: {email: 'email', off: 'off'},
  inputAlign: {top: 'top', center: 'center'},
  type: {next: 'next', go: 'go', done: 'done'},
};

export {imageProperties, nativeDriver, statusBar, textInput};

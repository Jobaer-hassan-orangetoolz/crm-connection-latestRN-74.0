import {Dimensions, StatusBar} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const SCREENS = {
  splash: 'splash',
  login: 'login',
  home: 'home',
  onboarding: 'onboarding',
  inactivePackage: 'inactivePackage',
};

const DEAL_COLORS = [
  {value: '#EC1111', title: '#EC1111', titleColor: '#FFFFFF'},
  {value: '#d4d226', title: '#d4d226', titleColor: '#FFFFFF'},
  {value: '#8e4b10', title: '#8e4b10', titleColor: '#FFFFFF'},
  {value: '#2DE80C', title: '#2DE80C', titleColor: '#FFFFFF'},
  {value: '#0759F3', title: '#0759F3', titleColor: '#FFFFFF'},
  {value: '#9E00DA', title: '#9E00DA', titleColor: '#FFFFFF'},
  {value: '#6701F9', title: '#6701F9', titleColor: '#FFFFFF'},
  {value: '#ff0088', title: '#ff0088', titleColor: '#FFFFFF'},
  {value: '#0A2C56', title: '#0A2C56', titleColor: '#FFFFFF'},
  {value: '#0F9B87', title: '#0F9B87', titleColor: '#FFFFFF'},
  {value: '#5D6D7E', title: '#5D6D7E', titleColor: '#FFFFFF'},
  {value: '#C70039', title: '#C70039', titleColor: '#FFFFFF'},
  {value: '#CACFD2', title: '#CACFD2', titleColor: '#000000'},
  {value: '#0B5345', title: '#0B5345', titleColor: '#FFFFFF'},
  {value: '#4A235A', title: '#4A235A', titleColor: '#FFFFFF'},
  {value: '#27AE60', title: '#27AE60', titleColor: '#FFFFFF'},
  {value: '#000000', title: '#000000', titleColor: '#FFFFFF'},
];
const STAGE_COLORS = [
  {value: '#006DF5', title: 'Blue', titleColor: '#FFFFFF'},
  {value: '#00B4D8', title: 'Cyan', titleColor: '#FFFFFF'},
  {value: '#E85D04', title: 'Orange', titleColor: '#FFFFFF'},
  {value: '#FFBE0B', title: 'Yellow', titleColor: '#FFFFFF'},
  {value: '#386641', title: 'Green', titleColor: '#FFFFFF'},
  {value: '#9B5DE5', title: 'Purple', titleColor: '#FFFFFF'},
  {value: '#FB6F92', title: 'Rose Pink', titleColor: '#FFFFFF'},
  {value: '#003459', title: 'Navy Blue', titleColor: '#FFFFFF'},
  {value: '#1B1D20', title: 'Black', titleColor: '#FFFFFF'},
  {value: '#494A4D', title: 'Gray', titleColor: '#FFFFFF'},
  {value: '#640D14', title: 'Rosewood', titleColor: '#FFFFFF'},
  {value: '#335C67', title: 'Dark Slate', titleColor: '#FFFFFF'},
  {value: '#ECF39E', title: 'Mindaro', titleColor: '#000000'},
  {value: '#E9D8A6', title: 'Vanilla', titleColor: '#000000'},
  {value: '#EE9B00', title: 'Gamboge', titleColor: '#FFFFFF'},
  {value: '#390099', title: 'Duke Blue', titleColor: '#FFFFFF'},
  {value: '#0B58EF', title: 'Indigo', titleColor: '#FFFFFF'},
  {value: '#FFC8DD', title: 'Fairy Tale', titleColor: '#000000'},
  {value: '#FFFFFF', title: 'White', titleColor: '#000000', hasBorder: true},
];

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  STATUS_BAR_HEIGHT,
};
export {SCREENS, DEAL_COLORS, STAGE_COLORS};

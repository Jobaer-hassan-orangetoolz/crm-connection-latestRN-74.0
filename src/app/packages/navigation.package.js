import {createStackNavigator as customCreateStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer as CustomNavigationContainer,
  useNavigation as useCustomNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator as CustomCreateBottomTabNavigator} from '@react-navigation/bottom-tabs';

export {
  CustomNavigationContainer,
  customCreateStackNavigator,
  useCustomNavigation,
  CustomCreateBottomTabNavigator,
};

const Tab = CustomCreateBottomTabNavigator();
export {Tab};

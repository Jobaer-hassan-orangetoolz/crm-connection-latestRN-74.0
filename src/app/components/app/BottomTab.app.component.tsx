/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors.style.asset';
import {
  activityHeight,
  validateBadgeValue,
} from '../../utilities/helper.utility';
import {Tab} from '../../packages/navigation.package';
import BottomTabBarIcon from './BottomTabBarIcon';
import {tabOptions} from '../../assets/js/dropdown.data';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {screens} from '../../routes/routeName.route';
import CustomBottomTabBar from './CustomBottomTabBar';
import {customUseSelector} from '../../packages/redux.package';
import {userStates} from '../../states/allSelector.state';

interface types {
  onClick?: Function;
}

const BottomTab: React.FC<types> = ({onClick}) => {
  const aH = activityHeight();
  const {unreadCount: badgeValue} = customUseSelector(userStates);
  const tabBarIcon = (item: any) => (
    <BottomTabBarIcon
      title={item?.title}
      Icon={item?.icon}
      hasBadge={item?.hasBadge}
      badgeValue={validateBadgeValue(badgeValue)}
    />
  );
  const renderTabs = () => {
    const view: any = [];
    tabOptions.map((item, index) => {
      let extra: any = {};
      if (item.hasBadge) {
        extra.tabBarBadge = badgeValue;
        extra.tabBarBadgeStyle = {
          color: colors.white,
          backgroundColor: colors.badgeColor,
        };
      }
      if (item.hideIcon) {
        extra.tabBarItemStyle = {display: 'none'};
        extra.detachInactiveScreens = true;
      }
      view.push(
        <Tab.Screen
          key={index}
          options={{
            tabBarIcon: () => tabBarIcon(item),
            tabBarLabel: item.title,
            lazy: true,
            ...extra,
          }}
          name={item.name}
          component={item.Component}
        />,
      );
    });
    return view;
  };
  return (
    <Tab.Navigator
      //   initialRouteName={screens.dashboard}
      initialRouteName={screens.dashboard}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.tab.activeTab,
        tabBarInactiveTintColor: colors.tab.inactiveText,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopColor: colors.gray8,
          borderTopWidth: 0.5,
          paddingTop: rs(16),
          height: rs(70 + aH),
          paddingBottom: rs(aH),
        },
      }}
      tabBar={props => (
        <CustomBottomTabBar
          {...props}
          onPress={(screen: any) => onClick(screen)}
        />
      )}>
      {renderTabs()}
    </Tab.Navigator>
  );
};
export default BottomTab;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    position: 'relative',
    borderTopColor: colors.error1,
    borderTopWidth: 1,
  },
  addIcon: {backgroundColor: colors.primary, borderRadius: 50, padding: 2},
});

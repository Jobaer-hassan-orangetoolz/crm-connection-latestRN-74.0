import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import rs from '../../assets/styles/responsiveSize.style.asset';
import AddItemBottomSheet from '../../modules/dashboard/bottomSheet/AddItem.BottomSheet';
import {selectedDrawer} from '../../modules/splash/hooks/useHome.hook';

const CustomBottomTabBar = ({state, descriptors, onPress}: any) => {
  const renderTabs = (_item: any, _index: any) => {
    return (
      <View key={_index}>
        {_item.tabBarIcon()}
        <Text>
          {_item.title} {_item.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        if (isFocused) {
          selectedDrawer.value = route.name;
        }
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() =>
              onPress(
                route.name === 'add'
                  ? global.showBottomSheet({
                      flag: true,
                      component: AddItemBottomSheet,
                    })
                  : route.name,
              )
            }
            style={[globalStyles.flex1, {...options.tabBarItemStyle}]}>
            {renderTabs(options, index)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default CustomBottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: colors.gray6,
    borderTopWidth: 0.5,
    paddingTop: rs(16),
    height: rs(70),
    backgroundColor: colors.white,
    elevation: 10,
  },
});

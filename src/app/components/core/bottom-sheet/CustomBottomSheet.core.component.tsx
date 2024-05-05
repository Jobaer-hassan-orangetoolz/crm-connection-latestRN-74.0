import React, {FC, forwardRef, memo} from 'react';
import {Animated, Pressable, View} from 'react-native';
import useBottomSheetHook from './useBottomSheet.hook';
import styles from './bottomSheet.style';
import {bottomSheet} from './bottomSheetInterface';
import CustomStatusBar from '../CustomStatusBar.core.component';

const CustomBottomSheet: FC<bottomSheet> = forwardRef(
  ({Component, backDropHandler, extraProps}, ref) => {
    const {opacityRef, positionRef, handleHideComponent} = useBottomSheetHook(
      ref,
      backDropHandler,
      extraProps,
    );
    return (
      <View style={styles.container}>
        <CustomStatusBar showHeader={false} />
        <Animated.View style={[styles.backdrop, {opacity: opacityRef}]}>
          <Pressable
            onPress={handleHideComponent}
            style={styles.backdropHandler}
          />
          <Animated.View
            style={[
              styles.viewContainer,
              {transform: [{translateY: positionRef}]},
            ]}>
            <Component {...extraProps.componentProps} />
          </Animated.View>
        </Animated.View>
      </View>
    );
  },
);

export default memo(CustomBottomSheet);

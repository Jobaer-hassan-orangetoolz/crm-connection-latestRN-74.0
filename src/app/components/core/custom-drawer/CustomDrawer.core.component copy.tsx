/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Animated,
  View,
  Text,
} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/js/core.data';
import {
  imageProperties,
  nativeDriver,
} from '../../../assets/styles/properties.asset';
import EachDrawerItem from './EachDrawerItem';
import {drawerList} from '../../../assets/js/dropdown.data';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import CustomStatusBar from '../CustomStatusBar.core.component';
import ImagePreview from '../ImagePreview.core.component';
import {imageLink} from '../../../assets/images/link.image.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {selectedDrawer} from '../../../modules/splash/hooks/useHome.hook';

interface props {
  ref: any;
  containerStyles?: object;
  hideComponent?: () => void;
  backdropStyles?: object;
  onOpen?: () => void;
  onClose?: () => void;
}

const CustomDrawer: FC<props> = forwardRef(
  (
    {containerStyles, backdropStyles, onOpen = () => {}, onClose = () => {}},
    ref,
  ) => {
    const positionRef = useRef(new Animated.Value(-SCREEN_WIDTH));
    const opacityRef = useRef(new Animated.Value(0));
    useImperativeHandle(ref, () => ({
      show() {
        showComponent();
      },
      hide() {
        hideComponent();
      },
    }));
    const showComponent = () => {
      Animated.sequence([
        Animated.timing(opacityRef.current, {
          toValue: 1,
          duration: 0,
          delay: 0,
          useNativeDriver: nativeDriver(),
        }),
        Animated.timing(positionRef.current, {
          toValue: 0,
          duration: 300,
          delay: 100,
          useNativeDriver: nativeDriver(),
        }),
      ]).start(() => onOpen());
    };
    const hideComponent = () => {
      Animated.sequence([
        Animated.timing(positionRef.current, {
          toValue: -SCREEN_WIDTH,
          duration: 300,
          delay: 0,
          useNativeDriver: nativeDriver(),
        }),
        Animated.timing(opacityRef.current, {
          toValue: 0,
          duration: 100,
          delay: 0,
          useNativeDriver: nativeDriver(),
        }),
      ]).start(() => onClose());
    };
    const navigation = useCustomNavigation();
    const memoListView = useMemo(
      () =>
        drawerList.map((item, index) => {
          const memoList = item.map(({title, icon, value}, itemIndex) => (
            <EachDrawerItem
              key={itemIndex}
              title={title}
              icon={icon}
              isSelected={selectedDrawer.value === value}
              onPress={() => {
                navigation.navigate(value as never);
                hideComponent();
                selectedDrawer.value = value;
              }}
            />
          ));
          return (
            <View
              style={[
                styles.section,
                index === drawerList.length - 1 ? styles.noBorder : {},
              ]}
              key={index}>
              {memoList}
            </View>
          );
        }),
      [],
    );
    return (
      <View style={[styles.container, containerStyles]}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={colors.transparent}
          onPress={hideComponent}>
          <Animated.View
            style={[
              styles.backDrop,
              backdropStyles,
              {opacity: opacityRef.current},
            ]}
          />
        </TouchableHighlight>
        <Animated.View
          style={[
            styles.drawer,
            {transform: [{translateX: positionRef.current}]},
          ]}>
          <CustomStatusBar />
          <View style={styles.top}>
            <View style={styles.logo}>
              <ImagePreview
                // resizeMode={imageProperties.resizeMode.stretch}
                source={imageLink.logo}
                // styles={globalStyles.flex1}
              />
            </View>
            <View>{memoListView}</View>
          </View>
          <View style={styles.footer}>
            <ImagePreview
              resizeMode={imageProperties.resizeMode.contain}
              source={imageLink.placeholder}
              styles={styles.profileImage}
            />
            <Text>afasdfad</Text>
          </View>
        </Animated.View>
      </View>
    );
  },
);
export default React.memo(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 1,
    top: 0,
    left: 0,
  },
  backDrop: {width: '100%', height: '100%', backgroundColor: '#131517b3'},
  drawer: {
    height: '100%',
    width: '72%',
    backgroundColor: colors.primary,
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  top: {gap: 20, flexGrow: 1},
  logo: {padding: 16, height: 60},
  section: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    ...customPadding(12, 0, 12, 0),
    gap: 2,
  },
  noBorder: {borderBottomWidth: 0},
  footer: {
    height: 'auto',
    ...customPadding(20, 16, 20, 16),
    gap: 12,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexGrow: 1,
    flex: 1,
  },
  profileImage: {height: 40, width: 40, overflow: 'hidden', borderRadius: 50},
});

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
  ScrollView,
  StatusBar,
} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/js/core.data';
import {
  imageProperties,
  nativeDriver,
} from '../../../assets/styles/properties.asset';
import EachDrawerItem from './EachDrawerItem';
import {drawerList} from '../../../assets/js/dropdown.data';
import {customPadding} from '../../../assets/styles/global.style.asset';
import CustomStatusBar from '../CustomStatusBar.core.component';
import ImagePreview from '../ImagePreview.core.component';
import {imageLink} from '../../../assets/images/link.image.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {selectedDrawer} from '../../../modules/splash/hooks/useHome.hook';
import {getHexaOpacityColorCode} from '../../../utilities/helper.utility';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import Footer from './Footer';
import FooterAgency from './FooterAgency';
import {config} from '../../../../config';

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
    const navigation = useCustomNavigation();
    const positionRef = useRef(new Animated.Value(-SCREEN_WIDTH));
    const opacityRef = useRef(new Animated.Value(0));
    const commonAppRef = useRef(config.commonApp).current;
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

    const memoListView = useMemo(
      () =>
        drawerList.map((item, index) => {
          const memoList = item.map(
            ({title, icon, value, hasBadge}, itemIndex) => (
              <EachDrawerItem
                key={itemIndex}
                title={title}
                icon={icon}
                hasBadge={hasBadge}
                isSelected={selectedDrawer.value === value}
                onPress={() => {
                  navigation.navigate(value as never);
                  hideComponent();
                }}
              />
            ),
          );
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
          <View style={styles.body}>
            <View style={commonAppRef ? styles.top0 : styles.top20}>
              {commonAppRef && (
                <Footer
                  hideComponent={hideComponent}
                  hasTopBorder={false}
                  hasBottomBorder={true}
                />
              )}
              {!commonAppRef && (
                <View style={styles.logoPreview}>
                  <ImagePreview
                    styles={styles.logo}
                    source={imageLink.logo}
                    resizeMode={imageProperties.resizeMode.contain}
                  />
                </View>
              )}
              <ScrollView showsVerticalScrollIndicator={false}>
                {memoListView}
              </ScrollView>
            </View>
            {!commonAppRef && <Footer hideComponent={hideComponent} />}
            {commonAppRef && <FooterAgency />}
          </View>
        </Animated.View>
      </View>
    );
  },
);
export default React.memo(CustomDrawer);

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 1,
    bottom: 0,
    left: 0,
  },
  backDrop: {width: '100%', height: '100%', backgroundColor: '#131517b3'},
  drawer: {
    height: '100%',
    width: '72%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: colors.drawer.bg,
  },
  body: {
    justifyContent: 'space-between',
    ...customPadding(20, 0, 10, 0),
    flexGrow: 1,
  },
  agencyName: {
    ...typographies.bodyMediumBold,
    color: colors.drawer.text,
    textTransform: 'uppercase',
  },
  top20: {gap: 20, flex: 1},
  top0: {gap: 0, flex: 1},
  logoPreview: {
    height: 60,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: StatusBar.currentHeight === 0 ? 30 : 0,
  },
  logoPreviewAlt: {
    ...customPadding(16, 0, 6, 0),
  },
  logo: {flexGrow: 1, flex: 1, height: 26, width: 228},
  section: {
    borderBottomColor: getHexaOpacityColorCode(colors.drawer.divider, 0.15),
    borderBottomWidth: 1,
    ...customPadding(12, 0, 12, 0),
    gap: 2,
  },
  noBorder: {borderBottomWidth: 0},
  footer: {
    height: 'auto',
    ...customPadding(20, 16, 20, 16),
    gap: 12,
    borderTopColor: getHexaOpacityColorCode(colors.drawer.divider, 0.15),
    borderBottomColor: getHexaOpacityColorCode(colors.drawer.divider, 0.15),
    flexDirection: 'row',
  },
  footerAlt: {...customPadding(0, 16, 5, 16), gap: 5},
  footerAgency: {flexDirection: 'column'},
  topBorder: {borderTopWidth: 1},
  bottomBorder: {borderBottomWidth: 1},
  profileImage: {height: 40, width: 40, overflow: 'hidden', borderRadius: 50},
  profileCont: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'flex-start',
  },
});

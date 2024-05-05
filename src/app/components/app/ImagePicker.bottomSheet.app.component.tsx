import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import LeftArrowIcon from '../../assets/icons/LeftArrow.icon.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {titles} from '../../assets/js/titles.message';
import CameraIcon from '../../assets/icons/Camera.icon.asset';
import GalleryFillIcon from '../../assets/icons/GalleryFill.icon.asset';
import {getHexaOpacityColorCode} from '../../utilities/helper.utility';
import imagePicker from '../../packages/image-picker/imagePicker';

const ImagePickerBottomSheet: React.FC<{
  success: (params: any) => void;
  failed: (params: any) => void;
}> = ({success, failed}) => {
  const handleOpenCamera = () => {
    global.showBottomSheet({flag: false});
    imagePicker.openCamera({success, failed});
  };
  const handleOpenGallery = () => {
    global.showBottomSheet({flag: false});
    imagePicker.openGallery({success, failed, multiple: true});
  };
  return (
    <View>
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            global.showBottomSheet({flag: false});
          }}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={[typographies.bodyLargeBold, globalStyles.flexShrink1]}>
          {'Image Picker'}
        </Text>
      </View>
      <View style={[globalStyles.rowBetween, styles.middleHeader]}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={handleOpenCamera}>
          <View style={styles.imageContainer}>
            <CameraIcon
              height={rs(40)}
              width={rs(40)}
              fill={getHexaOpacityColorCode(colors.primary, 0.5)}
            />
          </View>
          <Text style={typographies.bodyMediumBold}>{titles.openCamera}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={handleOpenGallery}>
          <View style={styles.imageContainer}>
            <GalleryFillIcon
              height={rs(40)}
              width={rs(40)}
              fill={getHexaOpacityColorCode(colors.primary, 0.5)}
            />
          </View>
          <Text style={typographies.bodyMediumBold}>{titles.openGallery}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePickerBottomSheet;

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...customPadding(10, 20, 10, 20),
  },
  container: {
    alignItems: 'center',
    width: '50%',
  },
  imageContainer: {
    height: rs(88),
    width: rs(88),
    backgroundColor: colors.gray9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    ...customMargin(0, 0, 8),
  },
  middleHeader: {...customPadding(20, 0, 20, 0), flex: 0, gap: 0},
});

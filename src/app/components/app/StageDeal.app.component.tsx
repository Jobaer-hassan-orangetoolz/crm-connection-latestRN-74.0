import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ContactImage from './ContactImage.app.component';
import {pipelineModal} from '../../services/models/_Pipeline.modal';
import RightArrow from '../../assets/icons/RightArrow.icon.asset';
import {
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import DealBottomSheet from '../../modules/pipeline/bottomSheet/Deal.BottomSheet';
import {
  stageDealItemInterface,
  stageDealFormatter,
  stageDealInterface,
} from '../../services/formatter/pipeline.formatter';
import {
  calculateCash,
  getHexaOpacityColorCode,
} from '../../utilities/helper.utility';
import pipelineApiHelper from '../../services/api/helper/pipelineApi.helper';
import {stageInterface} from '../../services/formatter/stage.formatter';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';

const StageDeal: React.FC<{
  index: number;
  success: any;
  stage: stageInterface;
  pipeline: stageDealInterface;
  item: stageDealItemInterface;
}> = ({item, pipeline, stage, index = -1, success}) => {
  const {
    dealValue = 0,
    name,
    email,
    bgColor,
    number,
    status,
    contactId,
  } = stageDealFormatter(item);
  const handlePress = (value: number) => {
    const updateStatus = value === 3 ? 0 : 1;
    success('', index, true);
    pipelineApiHelper.stageWin({
      dealId: item.id,
      contactId: item.contactId,
      status: updateStatus,
    });
  };
  const navigation = useCustomNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        global.showBottomSheet({
          flag: true,
          component: DealBottomSheet,
          componentProps: {
            item,
            index,
            success,
            stage,
            pipeline,
            onPress: handlePress,
          },
        });
      }}
      style={[stageDealStyles.container, {...customPadding(12, 20, 12, 20)}]}>
      <View style={stageDealStyles.leftContainer}>
        <ContactImage
          name={name}
          bg={getHexaOpacityColorCode(bgColor, 0.1)}
          textColor={bgColor}
          size={'52'}
        />
        <View style={globalStyles.flexShrink1}>
          <Text numberOfLines={1} style={typographies.bodyMediumBold}>
            {name || email || number}
          </Text>
          <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
            {calculateCash(dealValue)}
          </Text>
        </View>
      </View>
      <View style={stageDealStyles.leftContainer}>
        <Text
          style={[
            typographies.labelLarge,
            stageDealStyles.text,
            (stageDealStyles as any)[
              (pipelineModal as any)[status]?.toLowerCase()
            ],
          ]}>
          {(pipelineModal as any)[status]}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.contactDetails, {id: contactId});
          }}
          style={{...customPadding(2, 2, 2, 2)}}>
          <RightArrow />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default StageDeal;

export const stageDealStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flexShrink: 1,
  },
  text: {...customPadding(4, 12, 4, 12), borderWidth: 1, borderRadius: 100},
  open: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    color: colors.primary,
  },
  won: {
    backgroundColor: colors.success3,
    borderColor: colors.success2,
    color: colors.success1,
  },
  lost: {
    backgroundColor: colors.error3,
    borderColor: colors.error2,
    color: colors.error1,
  },
  inactive: {
    backgroundColor: colors.error3,
    borderColor: colors.error2,
    color: colors.error1,
  },
});

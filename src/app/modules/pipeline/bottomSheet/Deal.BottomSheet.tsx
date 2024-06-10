import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {contactBottomSheetStyles} from '../../contact/styles/contactBottomSheet.styles';
import EditIcon from '../../../assets/icons/Edit.icon.asset';
import DeleteIcon from '../../../assets/icons/Delete.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {stageDealStyles} from '../../../components/app/StageDeal.app.component';
import {pipelineModal} from '../../../services/models/_Pipeline.modal';
import {titles} from '../../../assets/js/titles.message';
import IconWithText from '../../../components/app/IconWithText.app.component';
import {formatDate} from '../../../utilities/helper.utility';
import {pipelineBottomSheetOptions} from '../../../assets/js/dropdown.data';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {
  stageDealFormatter,
  stageDealInterface,
} from '../../../services/formatter/pipeline.formatter';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import pipelineApiHelper from '../../../services/api/helper/pipelineApi.helper';

const DealBottomSheet: React.FC<{
  item: any;
  index: number;
  stage: stageInterface;
  pipeline: stageDealInterface;
  success: (props: any, params1: any, params2: any) => void;
  onPress: (props: any) => void;
}> = ({item = {}, success, index, stage, pipeline, onPress = () => {}}) => {
  const {
    dealValue = 0,
    name,
    email,
    closeDate,
    number,
    status,
    contactId,
    id,
  } = stageDealFormatter(item);
  const two = 2;
  const navigation = useCustomNavigation<any>();
  const handleClick = (value: number) => {
    global.showBottomSheet({flag: false});
    if (value === 4) {
      navigation.navigate(screens.addDeal, {
        deal: item,
        success,
        stage,
        pipeline,
        index,
        move: true,
      });
      return;
    }
    onPress(value);
  };
  const handleDeleteDeal = () => {
    pipelineApiHelper.deleteDeal({
      contactId,
      dealId: id,
      dealValue,
    });
    success('', index, true);
    global.showBottomSheet({flag: false});
  };
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <IconWithTextHeader
        controlLeftIcon={() => global.showBottomSheet({flag: false})}
        rightComponent={
          <View style={contactBottomSheetStyles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate(screens.contactDetails, {id: contactId});
                global.showBottomSheet({flag: false});
              }}>
              <Text style={typographies.bodyMediumBold}>{titles.details}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate(screens.addDeal, {
                  deal: item,
                  stage,
                  pipeline,
                  index,
                  edit: true,
                  success,
                });
                global.showBottomSheet({flag: false});
              }}>
              <EditIcon width={28} height={28} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={handleDeleteDeal}>
              <DeleteIcon fill={colors.error1} width={28} height={28} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={[globalStyles.flexShrink1, styles.container]}>
        <View style={globalStyles.flexShrink1}>
          <Text style={typographies.headingLarge} numberOfLines={1}>
            {name || email || number}
          </Text>
          <View style={styles.direction}>
            <Text style={typographies.bodyMedium}>{titles.dealValue}: </Text>
            <Text style={typographies.bodyMediumBold}>${dealValue}</Text>
          </View>
        </View>
        <Text
          style={[
            typographies.labelLarge,
            stageDealStyles.text,
            (stageDealStyles as any)[
              (pipelineModal as any)[status].toLowerCase()
            ],
            {...customMargin(8)},
          ]}>
          {(pipelineModal as any)[status]}
        </Text>
      </View>
      <View style={styles.middleContainer}>
        {pipelineBottomSheetOptions.map((_item: any, _index: number) => {
          return status === 2 ? (
            _item.value !== 2 && (
              <IconWithText
                Icon={_item.Icon}
                key={_index}
                text={_item.name}
                style={styles.width}
                border={_item.border}
                iconColor={two === _item.value ? colors.white : _item.border}
                bg={_item.bg}
                onPress={() => {
                  handleClick(_item.value);
                }}
                classes={two === _item.value ? 'primary' : 'border'}
              />
            )
          ) : status === 3 ? (
            _item.value !== 3 && (
              <IconWithText
                Icon={_item.Icon}
                key={_index}
                text={_item.name}
                style={styles.width}
                border={_item.border}
                iconColor={two === _item?.value ? colors?.white : _item?.border}
                bg={_item.bg}
                onPress={() => {
                  handleClick(_item.value);
                }}
                classes={two === _item.value ? 'primary' : 'border'}
              />
            )
          ) : (
            <IconWithText
              Icon={_item.Icon}
              key={_index}
              text={_item.name}
              style={styles.width}
              border={_item.border}
              iconColor={two === _item?.value ? colors?.white : _item?.border}
              bg={_item.bg}
              onPress={() => {
                handleClick(_item.value);
              }}
              classes={two === _item.value ? 'primary' : 'border'}
            />
          );
        })}
      </View>
      {closeDate && (
        <View style={styles.bottomContainer}>
          <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
            {titles.dealClose}{' '}
          </Text>
          <Text style={[typographies.bodySmall, {color: colors.gray0}]}>
            {formatDate(closeDate, 'MMM DD, YYYY')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DealBottomSheet;

const styles = StyleSheet.create({
  container: {
    ...customPadding(12, 20, 12, 20),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...customPadding(20, 20, 20, 20),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...customPadding(8, 0, 8),
  },
  width: {width: '33%'},
  direction: {flexDirection: 'row'},
});

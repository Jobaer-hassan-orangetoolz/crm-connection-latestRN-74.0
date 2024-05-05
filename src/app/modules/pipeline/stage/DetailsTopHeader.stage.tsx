/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {generateColor, stageDetailsStyles} from '../styles/stage.style';
import AddIcon from '../../../assets/icons/Add.icon.asset';
import {titles} from '../../../assets/js/titles.message';
import StageTab from './StageTab.module';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import EditIcon from '../../../assets/icons/Edit.icon.asset';
import {probabilityPercentage} from '../../../assets/js/dropdown.data';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import {calculateCash} from '../../../utilities/helper.utility';

const DetailsTopHeader: React.FC<{
  item: stageInterface;
  handleStatus: (params: any) => void;
  status: number;
  index: number;
  pipeline: any;
  stats: any;
  loading: boolean;
  successAddDeal: (params: any) => void;
  successStage: (params: any) => void;
}> = ({
  item = {},
  status,
  handleStatus = () => {},
  pipeline,
  successAddDeal,
  successStage,
  stats,
  loading = false,
}) => {
  const navigation = useCustomNavigation<any>();
  const {stage, percentage, colorCode, textColor} = item;
  const {totalDealValue, totalContacts} = stats || {
    totalDealValue: 0,
    totalContacts: 0,
  };
  const styles = stageDetailsStyles({
    bgColor: colorCode,
    textColor: textColor,
  });
  const statusColor = generateColor(item.textColor, item.colorCode);

  const renderRightIcons = () => {
    return (
      <View style={styles.headerWrp}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screens.addDeal, {
              from: true,
              pipeline,
              success: successAddDeal,
              stage: item,
            })
          }
          activeOpacity={0.7}>
          <AddIcon fill={textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screens.addStage, {
              stage: item,
              pipeline,
              successStage,
              edit: true,
            })
          }
          activeOpacity={0.7}>
          <EditIcon fill={textColor} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <IconWithTextHeader
        leftIcon={<LeftArrowIcon fill={textColor} height={28} width={28} />}
        rightComponent={renderRightIcons()}
        style={{backgroundColor: statusColor}}
      />
      <View style={styles.headerInfo}>
        <Text style={[styles.headerTitle, {fontSize: 25}]}>{stage}</Text>
        {!loading && (
          <View style={styles.headerSubInfo}>
            <Text style={styles.textSubInfo}>
              {calculateCash(totalDealValue) || 0}
            </Text>
            <View style={styles.dotDivider} />
            <Text style={styles.textSubInfo}>
              {totalContacts || 0} {titles.deals}
            </Text>
            <View style={styles.dotDivider} />
            <Text style={[styles.textSubInfo, styles.textSubBg]}>
              {(probabilityPercentage as any)[percentage]}
            </Text>
          </View>
        )}
      </View>
      <StageTab handleStatus={handleStatus} status={status} />
    </View>
  );
};

export default DetailsTopHeader;

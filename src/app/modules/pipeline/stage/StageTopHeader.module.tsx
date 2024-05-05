/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../assets/styles/colors.style.asset';
import CustomDropdown from '../../../components/core/CustomDropdown.core.component';
import {stageStyles as styles} from '../styles/stage.style';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {titles} from '../../../assets/js/titles.message';
import {config} from '../../../../config';
import {isEmpty} from '../../../utilities/helper.utility';
import usePipeline from '../hook/usePipeline.hook';

const StageTopHeader: React.FC<{
  isLoading: boolean;
  dealStats: any;
  handlePipeline: (params: any) => void;
  pipeline: any;
}> = ({
  isLoading = false,
  dealStats = {},
  handlePipeline = () => {},
  pipeline = {},
}) => {
  const {list} = usePipeline();
  useEffect(() => {
    if (list?.length > 0 && !pipeline?.status) {
      handlePipeline(list[0]);
    }
  }, [list]);
  const handlePress = (_item: any) => {
    handlePipeline(_item);
  };
  return (
    <View style={styles.reportWrp}>
      <View style={styles.filterWrp}>
        <Text style={styles.filterLabel}>{titles.pipeline}: </Text>
        {pipeline.pipelineId && (
          <CustomDropdown
            text={pipeline?.title}
            component={BottomSheetSelect}
            componentProps={{
              options: {
                search: false,
                titleField: 'title',
                refreshing: false,
                data: list,
                flatList: true,
              },
              onChange: handlePress,
            }}
            containerStyles={styles.flex0}
            iconFill={colors.primary}
            textStyles={styles.filterLabelValue}
          />
        )}
      </View>
      {!isLoading && !isEmpty(dealStats) && (
        <View style={styles.reportBody}>
          <View style={globalStyles.gap2}>
            <Text style={typographies.bodySmallBold}>
              {titles.pipelineValue}
            </Text>
            <Text style={styles.dealValue}>
              {config.currencySymbol}
              {dealStats.total_deals || 0}
            </Text>
          </View>
          <View style={styles.valueWrp}>
            <View>
              <Text style={styles.valueStatsTitle}>{titles.open}</Text>
              <Text style={typographies.bodyMediumBold}>
                {config.currencySymbol}
                {dealStats.active || 0}
              </Text>
            </View>
            <View>
              <Text style={styles.valueStatsTitle}>{titles.won}</Text>
              <Text style={typographies.bodyMediumBold}>
                {config.currencySymbol}
                {dealStats.win || 0}
              </Text>
            </View>
            <View>
              <Text style={styles.valueStatsTitle}>{titles.lost}</Text>
              <Text style={typographies.bodyMediumBold}>
                {config.currencySymbol}
                {dealStats.lost || 0}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default StageTopHeader;

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {customPadding} from '../../../assets/styles/global.style.asset';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import {titles} from '../../../assets/js/titles.message';
import CustomFieldModel from '../../../services/models/CustomField.model';
import CustomButton from '../../../components/core/button/CustomButton.core.component';
const ScheduleOption: React.FC = ({scheduleData, handleSubmit}: any) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  return (
    <View>
      <IconWithTextHeader
        controlLeftIcon={() => {
          global.showBottomSheet({flag: false});
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <CustomFieldLayout
          value={date}
          label={titles.scheduledDate}
          placeholder={'mm/dd/yyyy'}
          onChange={value => {
            setDate(value);
            scheduleData.current.date = value;
          }}
          type={CustomFieldModel.TYPE_DATE}
          showRemove={false}
        />
        <CustomFieldLayout
          value={time}
          label={titles.scheduledTime}
          placeholder={'hh:mm'}
          onChange={value => {
            setTime(value);
            scheduleData.current.time = value;
          }}
          type={CustomFieldModel.TYPE_TIME}
          showRemove={false}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.timeText} />
        <CustomButton
          text={'Schedule Send'}
          onPress={() => {
            scheduleData.current.flag = true;
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
};
export default ScheduleOption;
const styles = StyleSheet.create({
  container: {...customPadding(0, 20, 0, 20)},
  footer: {...customPadding(0, 20, 40, 20)},
  timeText: {
    paddingVertical: 8,
  },
});

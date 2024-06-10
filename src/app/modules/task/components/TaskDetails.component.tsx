import {Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {customMargin} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CustomButton from '../../../components/core/button/CustomButton.core.component';
import CheckCircleIcon from '../../../assets/icons/CheckCircle.icon.asset';
import CustomButtonWithIcon from '../../../components/core/button/CustomButtonWithIcon.core.component';
import {taskItemStyles} from '../style/taskItem.style';
import {titles} from '../../../assets/js/titles.message';
import TaskIconWithText from './TaskIconWithText.component';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import CalenderIcon from '../../../assets/icons/Calender.icon.asset';
import TimeIcon from '../../../assets/icons/Time.icon.asset';
import ContactItem from '../../../components/app/ContactItem.app.component';
import {formatDate} from '../../../utilities/helper.utility';
import {taskInterface} from '../../../services/formatter/task.formatter';
import {customUseDispatch} from '../../../packages/redux.package';
import {updateContactMarkAsDone} from '../../../states/features/contact/contactTask.slice';
import {deleteTask} from '../../../states/features/task/task.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {getLocalData} from '../../../packages/asyncStorage/storageHandle';
import {updateTaskReport} from '../../../states/features/dashboard/dashboard.slice';
import {taskTitles} from '../../../assets/js/dropdown.data';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';

const TaskDetailsComponent: React.FC<{
  data?: taskInterface | undefined | any;
  bottomSheet?: boolean;
  style?: ViewStyle;
  index?: any;
  contactId?: number;
}> = ({data, bottomSheet = false, style = {}, index, contactId = -1}) => {
  const {
    title = '',
    taskNote = '',
    taskStatus = 1,
    contactID = '',
    name = '',
    email = '',
    number = '',
    dealValue = 0,
    taskId = 1,
    id,
    dateTime,
    taskTime,
    taskDate,
  } = data || {};
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation();
  const styles = taskItemStyles;
  const handleMarkAsDone = async () => {
    const timezone = await getLocalData.getUserTimezone();
    if (bottomSheet) {
      contactApiHelper.contactTaskDone({
        taskId: data.id,
        contactId: contactId,
        done: true,
      });
      dispatch(updateContactMarkAsDone(index));
      dispatch(deleteTask({id: data.id}));
      dispatch(updateTaskReport({item: data, timezone}));
      global.showBottomSheet({flag: false});
    } else {
      contactApiHelper.contactTaskDone({
        taskId: id,
        done: true,
      });
      dispatch(deleteTask({index}));
      navigation.goBack();
      dispatch(updateTaskReport({item: data, timezone}));
    }
  };
  const {Icon, title: taskTitle} = (taskTitles as any)[taskId];
  return (
    <View style={[styles.taskComponentCont, style]}>
      <View>
        <Text style={typographies.headingLarge}>{title}</Text>
        {taskNote && bottomSheet && (
          <Text
            style={[
              typographies.bodyMedium,
              {...customMargin(8), color: colors.gray4},
            ]}
            numberOfLines={4}>
            {taskNote}
          </Text>
        )}
        {!bottomSheet && contactID && (
          <View style={styles.contactBtnCont}>
            <ContactItem
              contact={false}
              campaign={true}
              item={{
                id: contactID,
                name,
                email,
                dealValue,
                number,
              }}
            />
          </View>
        )}
        <View style={{...customMargin(12, 0, 20), gap: rs(13)}}>
          <TaskIconWithText
            icon={<Icon fill={colors.primary} width={rs(20)} height={rs(20)} />}
            text={taskTitle?.toUpperCase()}
          />
          <TaskIconWithText
            icon={
              <CalenderIcon
                fill={colors.primary}
                width={rs(20)}
                height={rs(20)}
              />
            }
            text={formatDate(
              dateTime || taskDate + ' ' + taskTime,
              'MMM DD, YYYY',
              '',
              true,
            )}
          />
          <TaskIconWithText
            icon={
              <TimeIcon fill={colors.primary} width={rs(20)} height={rs(20)} />
            }
            text={formatDate(
              dateTime || taskDate + ' ' + taskTime,
              'hh:mm A',
              '',
              true,
            )}
          />
        </View>
        {taskNote && !bottomSheet && (
          <Text
            style={[
              typographies.bodyMedium,
              {...customMargin(8), color: colors.gray4},
            ]}>
            {taskNote}
          </Text>
        )}
      </View>
      <View>
        {taskStatus === 1 ? (
          <CustomButton text={titles.markDone} onPress={handleMarkAsDone} />
        ) : (
          <CustomButtonWithIcon
            text={titles.done}
            icon={<CheckCircleIcon fill={colors.gray6} />}
            classes="disable"
            disabled={true}
          />
        )}
      </View>
    </View>
  );
};

export default TaskDetailsComponent;

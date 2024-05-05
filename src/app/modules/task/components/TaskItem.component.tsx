import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {customMargin} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CheckCircleIcon from '../../../assets/icons/CheckCircle.icon.asset';
import {taskItemStyles as styles} from '../style/taskItem.style';
import {titles} from '../../../assets/js/titles.message';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {taskInterface} from '../../../services/formatter/task.formatter';
import {formatDate} from '../../../utilities/helper.utility';
import TaskIDetailsBottomSheet from './TaskIDetails.bottomSheet';
import {customUseDispatch} from '../../../packages/redux.package';
import {deleteTask} from '../../../states/features/task/task.slice';
import {taskTitles} from '../../../assets/js/dropdown.data';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {updateContactMarkAsDone} from '../../../states/features/contact/contactTask.slice';
import {contactInterface} from '../../../services/formatter/contact.formatter';
import {isRefreshingTask} from '../../../states/features/dashboard/dashboard.slice';
interface taskItem {
  item: taskInterface;
  index?: number;
  bottomSheet?: boolean;
  contactId?: number;
  contact?: boolean;
  contactInfo?: contactInterface;
  disabled?: boolean;
  from?: string;
}
const TaskItem: React.FC<taskItem> = ({
  item,
  index = '',
  bottomSheet = false,
  contact = false,
  contactId = -0,
  contactInfo,
  disabled = false,
  from = 'task',
}) => {
  const navigation = useCustomNavigation<any>();
  const {
    title,
    taskId = -1,
    taskStatus = 1,
    dateTime,
    taskDate,
    taskTime,
    id = -0,
  } = item || {};
  const dispatch = customUseDispatch();
  const handleMarkDone = async () => {
    if (from === 'dashboard') {
      const result = await contactApiHelper.contactTaskDone({
        taskId: id,
        done: true,
      });
      dispatch(isRefreshingTask());
      return;
    }
    if (contact) {
      dispatch(updateContactMarkAsDone(index));
      contactApiHelper.contactTaskDone({
        contactId,
        taskId: id,
        done: true,
      });
    } else {
      dispatch(deleteTask({id}));
      contactApiHelper.contactTaskDone({
        taskId: id,
        done: true,
      });
    }
  };
  const handleNavigation = () => {
    bottomSheet
      ? global.showBottomSheet({
          flag: true,
          component: TaskIDetailsBottomSheet,
          componentProps: {item, index, contact, contactId, contactInfo},
        })
      : taskStatus !== 2 &&
        navigation.navigate(screens.taskDetails as never, {
          index,
          item: item,
        });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={taskStatus === 2 || disabled}
      onPress={handleNavigation}
      style={styles.container}>
      <View style={styles.flexShrink}>
        <Text style={[typographies.labelLarge, styles.topText]}>
          {(taskTitles as any)[taskId].title}
        </Text>
        <Text
          numberOfLines={2}
          style={[typographies.bodyLargeBold, {...customMargin(0, 0, 12)}]}>
          {title}
        </Text>
        <Text style={[typographies.bodyXS, {color: colors.gray4}]}>
          {`${formatDate(
            dateTime || taskDate + ' ' + taskTime,
            'DD MMM, YYYY',
            '',
            true,
          )} . ${formatDate(
            dateTime || taskDate + ' ' + taskTime,
            'hh:mm A',
            '',
            true,
          )}`}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        disabled={taskStatus === 2}
        onPress={handleMarkDone}>
        {taskStatus === 2 ? (
          <CheckCircleIcon fill={colors.gray6} />
        ) : (
          <Text style={[typographies.bodySmallBold, {color: colors.success1}]}>
            {titles.markDone}
          </Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TaskItem;

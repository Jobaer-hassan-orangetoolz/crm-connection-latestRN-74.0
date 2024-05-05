import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {taskInterface} from '../../../services/formatter/task.formatter';
import {customPadding} from '../../../assets/styles/global.style.asset';
import TaskDetailsComponent from './TaskDetails.component';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {contactBottomSheetStyles} from '../../contact/styles/contactBottomSheet.styles';
import EditIcon from '../../../assets/icons/Edit.icon.asset';
import DeleteIcon from '../../../assets/icons/Delete.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {customUseDispatch} from '../../../packages/redux.package';
import {updateContactMarkAsDone} from '../../../states/features/contact/contactTask.slice';
import {deleteTask} from '../../../states/features/task/task.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {contactInterface} from '../../../services/formatter/contact.formatter';
import {showAlertWithTwoActions} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';

const TaskIDetailsBottomSheet: React.FC<{
  item: taskInterface;
  index: number | string;
  contact?: boolean;
  contactId?: number;
  contactInfo?: contactInterface;
}> = ({
  item = {},
  index,
  contactId = -1,
  contact = false,
  contactInfo = {},
}) => {
  const {taskStatus = 1, id} = item;
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const handleEditContact = () => {
    global.showBottomSheet({flag: false});
    navigation.navigate(screens.addTask as never, {
      edit: true,
      item,
      index,
      contact: true,
      contactInfo,
    });
  };
  const handleDeleteContact = () => {
    if (contact) {
      const onSuccess = (params: string) => {
        if (params === 'confirm') {
          contactApiHelper.contactTaskDelete(id);
          dispatch(updateContactMarkAsDone(index));
          dispatch(deleteTask({id: item.id}));
          global.showBottomSheet({flag: false});
        }
      };
      showAlertWithTwoActions({
        title: titles.confirm,
        body: messages.deleteTask,
        onPressAction: onSuccess,
      });
    }
  };
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <IconWithTextHeader
        controlLeftIcon={() => global.showBottomSheet({flag: false})}
        rightComponent={
          taskStatus === 1 && (
            <View style={contactBottomSheetStyles.headerContainer}>
              <TouchableOpacity activeOpacity={0.5} onPress={handleEditContact}>
                <EditIcon width={28} height={28} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleDeleteContact}>
                <DeleteIcon fill={colors.error1} width={28} height={28} />
              </TouchableOpacity>
            </View>
          )
        }
      />
      <TaskDetailsComponent
        data={item}
        bottomSheet={true}
        index={index}
        contactId={contactId}
        style={{...customPadding(0, 20, 0, 20), flex: rs(0)}}
      />
    </View>
  );
};

export default TaskIDetailsBottomSheet;

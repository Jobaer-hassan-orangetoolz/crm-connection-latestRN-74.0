import {useEffect, useState} from 'react';
import {taskInterface} from '../../../services/formatter/task.formatter';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {
  contactFormatter,
  contactInterface,
} from '../../../services/formatter/contact.formatter';
import {customUseDispatch} from '../../../packages/redux.package';
import {deleteTask} from '../../../states/features/task/task.slice';
import {showAlertWithTwoActions} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
export interface selector {
  isLoading: boolean;
  data?: taskInterface | object | undefined;
  refreshing: boolean;
  isGetting: boolean;
  contact: contactInterface;
}

const useTaskDetails = (task?: taskInterface, index: number = -1) => {
  const [item, setItem] = useState({
    isLoading: true,
    data: {},
    contact: {},
    isGetting: false,
  } as selector);
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const loadData = async () => {
    const {contactID} = task;
    if (!contactID) {
      setItem(prev => ({
        ...prev,
        data: {...task},
        isLoading: false,
        isGetting: true,
      }));
      return;
    }
    setItem(prev => ({...prev, isLoading: true}));
    let result = await contactApiHelper.getContactDetails(task.contactID);
    const {body} = result as apiResponse;
    const contact = contactFormatter(body);

    if (typeof body === 'object') {
      setItem(prev => ({
        ...prev,
        data: {...task, ...contact, id: task.id},
        contact,
        isLoading: false,
        isGetting: true,
      }));
    }
  };
  useEffect(() => {
    if (!item?.isGetting) {
      loadData();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = () => {
    global.showBottomSheet({flag: false});
    navigation.navigate(screens.addTask as never, {
      edit: true,
      item: task,
      index,
      contactInfo: item.contact,
      setItem: setItem,
    });
  };
  const handleDelete = () => {
    const onSuccess = async (params: string) => {
      if (params === 'confirm') {
        contactApiHelper.contactTaskDelete(task.id);
        navigation.goBack();
        dispatch(deleteTask({index}));
      }
    };
    showAlertWithTwoActions({
      title: titles.confirm,
      body: messages.deleteTask,
      onPressAction: onSuccess,
    });
  };
  const {data, isLoading} = item;
  return {data, isLoading, handleEdit, handleDelete};
};

export default useTaskDetails;

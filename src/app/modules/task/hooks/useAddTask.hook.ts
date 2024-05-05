/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {titles} from '../../../assets/js/titles.message';
import {apiResponse} from '../../../services/api/api.interface';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {
  contactFormatter,
  contactInterface,
} from '../../../services/formatter/contact.formatter';
import {momentTimezone} from '../../../packages/momentTimezone.package';
import {taskTitles} from '../../../assets/js/dropdown.data';
import {getLocalData} from '../../../packages/asyncStorage/storageHandle';
import {taskInterface} from '../../../services/formatter/task.formatter';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {getTeamUser} from '../../../states/features/user/user.slice';
import {
  formatDate,
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {
  addContactTask,
  updateContactMarkAsDone,
  updateContactTask,
} from '../../../states/features/contact/contactTask.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {storeBottomSheetData} from '../../../states/features/bottomSheet/bottomSheet.slice';
import {addTask, updateTask} from '../../../states/features/task/task.slice';
import {screens} from '../../../routes/routeName.route';
import {userLocalTimezone} from '../../../services/models/_Timezone.modal';
interface valuesState {
  title: string;
  type: any;
  contactId: string;
  contact: string;
  date: Date;
  time: Date;
  description?: string;
  assignTo: string;
  assignToId: string;
}
const useAddTask = ({
  edit = false,
  contact = false,
  item,
  contactInfo,
  index,
  task,
}: {
  edit?: boolean;
  contact?: boolean;
  item?: taskInterface;
  contactInfo?: contactInterface;
  index?: number;
  task?: number;
}) => {
  const [values, setValues] = useState<valuesState>({
    title: '',
    type: (taskTitles as any)[task || 1],
    contact: '',
    contactId: '',
    date: new Date(),
    time: new Date(),
    description: '',
    assignTo: '',
    assignToId: '',
  });
  const navigation = useCustomNavigation<any>();
  const {teamUser, teamUserLoading} = customUseSelector(userStates);
  const [loading, setLoading] = useState<boolean>(false);
  const taskTypes = Object.values(taskTitles);
  const dispatch = customUseDispatch();
  const valuesSet = () => {
    const timezone = userLocalTimezone.timezone;
    const {
      title,
      taskId,
      contactID,
      dateTime,
      taskNote,
      assignedTo,
      taskDate,
      taskTime,
    } = item;
    const assignUser = teamUser.find((_item: any) => {
      return _item?.id === assignedTo;
    });
    const originalDate = momentTimezone.utc(
      dateTime || taskDate + ' ' + taskTime,
    );
    setValues({
      title,
      type: (taskTitles as any)[taskId],
      date: new Date(originalDate.tz(timezone).toISOString()),
      time: new Date(originalDate.tz(timezone).toISOString()),
      description: taskNote,
      contactId: contactID || contactInfo?.id,
      contact: contactInfo?.name || contactInfo?.email || contactInfo?.number,
      assignTo: assignUser?.fullName,
      assignToId: assignUser?.id,
    });
  };
  const addTaskValuesForContact = async () => {
    setValues({
      ...values,
      contactId: contactInfo?.id,
      contact: contactInfo?.name || contactInfo?.email || contactInfo?.number,
    });
  };
  useEffect(() => {
    if (edit) {
      valuesSet();
    }
    if (contact && !edit) {
      addTaskValuesForContact();
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(teamUser)) {
      dispatch(storeBottomSheetData({data: teamUser, name: titles.assignUser}));
    }
  }, [teamUser]);
  const getDataHandlerForUser = async () => {
    dispatch(getTeamUser(true));
  };
  const getDataHandlerForContact = async (
    {
      page,
      perPage,
      search,
    }: {
      page: number;
      perPage: number;
      search?: string;
    },
    callback: any,
  ) => {
    const result = await contactApiHelper.getContactList({
      page,
      perPage,
      search,
    });
    const {status} = result as apiResponse;
    if (status) {
      callback(result);
    } else {
      callback({status: false});
    }
  };
  const renderOptions = (params: any) => {
    switch (params?.name) {
      case 'type':
        return {
          ...params.options,
          titleField: 'title',
          title: titles.taskType,
          data: [...taskTypes],
          selectedValue: values?.type?.title,
        };
      case 'assignTo':
        return {
          ...params.options,
          titleField: 'fullName',
          title: titles.assignUser,
          data: teamUser,
          refreshButton: true,
          isLoading: teamUserLoading,
          selectedValue: values.assignTo,
          getDataHandler: getDataHandlerForUser,
        };
      case 'contact':
        return {
          ...params.options,
          getDataHandler: getDataHandlerForContact,
          formatter: contactFormatter,
          titleFieldFormatter: (__item: any) => {
            return __item.name || __item.email || __item.number;
          },
          title: titles.contacts,
          flatList: true,
          search: true,
          refreshing: true,
        };
      default:
        return {...params.options};
    }
  };
  const handleChange = (value?: any, name?: string) => {
    switch (name) {
      case 'type':
        setValues((prev: any) => ({
          ...prev,
          type: value,
        }));
        return;
      case 'contact':
        setValues((prev: any) => ({
          ...prev,
          contact: value?.name || value?.email || value?.number,
          contactId: value?.id,
        }));
        return;
      case 'assignTo':
        setValues((prev: any) => ({
          ...prev,
          assignTo: value?.fullName,
          assignToId: value?.id,
        }));
        return;
      default:
        setValues((prev: any) => ({...prev, [name]: value}));
        return;
    }
  };
  const handleSubmit = async () => {
    const timezone = await getLocalData.getUserTimezone();
    const {title, type, assignToId, contactId, date, time, description} =
      values;
    let updateDate = momentTimezone(date, 'YYYY-MM-DD').tz(timezone);
    let updateTime = momentTimezone(time, 'HH:mm:ss').tz(timezone);

    // Merge date and time
    let mergedDateTime = momentTimezone(updateDate)
      .set({
        hour: updateTime.hours(),
        minute: updateTime.minutes(),
        second: updateTime.seconds(),
      })
      .utc();
    const addPayload = {
      taskId: type.type,
      title,
      contactId,
      date: formatDate(date?.toISOString(), 'MM/DD/YYYY', timezone),
      time: momentTimezone(time).tz(timezone).format('HH:mm:ss'),
      assignedTo: assignToId || null,
      note: description,
      advanced: false,
      duration: '00:30',
    };

    const addObject = {
      taskTitle: title,
      dateTime: mergedDateTime.format(),
      note: description,
      taskId: type.type,
      assignedTo: assignToId,
      contact: contactId,
      duration: '00:30',
    };
    if (!title) {
      showAlertWithOneAction({title: 'Task', body: "Title can't empty!"});
      return;
    }
    if (edit) {
      const payload = {
        taskId: type.type,
        title,
        contactId,
        id: item.id,
        date: formatDate(date?.toISOString(), 'MM/DD/YYYY', timezone),
        time: momentTimezone(time).tz(timezone).format('HH:mm:ss'),
        note: description,
        duration: item?.duration,
      };

      const object = {
        id: item?.id,
        status: item.taskStatus,
        taskTitle: title,
        dateTime: mergedDateTime.format(),
        note: description,
        taskId: type.type,
        duration: item.duration,
        assignedTo: assignToId,
        reminderTimePeriod: item.reminderTimePeriod,
        sendInvitationToAttendence: item.attendance,
        notify_by_email: item.sendEmailNotification,
        contact: contactId,
      };
      setLoading(true);
      const result = await contactApiHelper.contactUpdateTask(payload);
      setLoading(false);
      const {message, status} = result as apiResponse;
      if (status) {
        if (contact) {
          contactId === contactInfo?.id
            ? dispatch(updateContactTask({index, item: object}))
            : dispatch(updateContactMarkAsDone(index));
        } else {
          dispatch(updateTask({index, item: object}));
        }
        contact ? navigation.goBack() : navigation.navigate(screens.task);
      } else {
        showAlertWithOneAction({title: 'Task', body: message});
      }
    } else {
      setLoading(true);
      const result = await contactApiHelper.contactAddTask(addPayload);
      setLoading(false);
      const {message, status, body} = result as apiResponse;
      if (status) {
        if (contact) {
          contactId === contactInfo.id &&
            dispatch(addContactTask({item: {...addObject, id: body?.id}}));
          navigation.goBack();
        } else {
          dispatch(addTask({item: {...addObject, id: body?.id}}));
          navigation.goBack();
        }
      } else {
        showAlertWithOneAction({title: 'Task', body: message});
      }
    }
  };
  return {handleChange, renderOptions, loading, handleSubmit, dispatch, values};
};
export default useAddTask;

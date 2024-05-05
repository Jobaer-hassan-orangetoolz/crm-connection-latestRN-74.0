export interface taskInterfaceItem {
  id: number;
  taskId: number;
  taskTitle: string;
  email?: string | undefined;
  contactNumber?: string | undefined;
  contactId?: string | undefined;
  note?: string | undefined;
  sendInvitationToAttendence: number;
  deal_value: number;
  status: number;
  date: string;
  time: string;
  end: string;
  assignedTo: number;
  duration?: string;
  notify_by_email?: number;
  reminderTimePeriod?: string;
  dateTime?: string;
}
export interface taskInterface {
  id: number;
  taskId: number;
  title?: string;
  email?: string | undefined;
  contactNumber?: string | undefined;
  contactID?: string | undefined;
  taskNote?: string | undefined;
  attendance: number;
  dealValue: number;
  taskStatus: number;
  taskDate: string;
  taskTime: string;
  end: string;
  assignedTo: number;
  duration?: string;
  sendEmailNotification?: number;
  reminderTimePeriod?: string;
  dateTime?: string;
}

const taskFormatter = (item: taskInterfaceItem) => {
  return {
    id: item.id,
    taskId: item.taskId,
    title: item.taskTitle,
    email: item.email,
    contactNumber: item.contactNumber,
    contactID: item.contactId,
    taskNote: item.note,
    attendance: item.sendInvitationToAttendence,
    dealValue: item.deal_value,
    taskStatus: item.status,
    taskDate: item.date,
    taskTime: item.time,
    end: item.end,
    assignedTo: item.assignedTo,
    duration: item?.duration,
    sendEmailNotification: item?.notify_by_email,
    reminderTimePeriod: item.reminderTimePeriod,
    dateTime: item.dateTime,
    ...item,
  };
};

export {taskFormatter};

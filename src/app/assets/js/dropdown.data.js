import React from 'react';
import CampaignIcon from '../icons/Campaign.icon.asset';
import ContactsIcon from '../icons/Contacts.icon.asset';
import DashboardIcon from '../icons/Dashboard.icon.asset';
import DealIcon from '../icons/Deal.icon.asset';
import InboxIcon from '../icons/Inbox.icon.asset';
import TasksIcon from '../icons/Tasks.icon.asset';
import UserIcon from '../icons/User.icon.asset';
import {colors} from '../styles/colors.style.asset';
import CallIcon from '../icons/Call.icon.asset';
import ActivityIcon from '../icons/Activity.icon.asset';
import ChatIcon from '../icons/Chat.icon.asset';
import {titles} from './titles.message';
import CreateIcon from '../icons/Create.icon.asset';
import NotesIcon from '../icons/Notes.icon.asset';
import ContactAbout from '../../modules/contact/details/tab-details/about/About.contact';
import ContactNotes from '../../modules/contact/details/tab-details/notes/Notes.contact';
import ContactTasks from '../../modules/contact/details/tab-details/tasks/Tasks.contact';
import {screens} from '../../routes/routeName.route';
import EmailIcon from '../icons/Email.icon.asset';
import ArchiveIcon from '../icons/Archive.icon.asset';
import PlayIcon from '../icons/Play.icon.asset';
import PauseIcon from '../icons/Pause.icon.asset';
import CloseIcon from '../icons/Close.icon.asset';
import ThumbsUpIcon from '../icons/ThumbsUp.icon.asset';
import ThumbsDownIcon from '../icons/ThumbsDown.icon.asset';
import RightArrowIcon from '../icons/RightArrowIcon.icon.asset';
import CustomColorPicker from '../../components/core/CustomColorPicker';
import {DEAL_COLORS, STAGE_COLORS} from './core.data';
import CustomFieldModel from '../../services/models/CustomField.model';
import MenuIcon from '../icons/Menu.icon.asset';
import CallKeyboard from '../../modules/call/call-keyboard/CallKeyboard.module';
import DialerIcon from '../icons/Dialer.icon.asset';
import AddIcon from '../icons/Add.icon.asset';
import EmptyTabScreen from '../../components/app/EmptyTabScreen';
import Dashboard from '../../modules/dashboard/Dashboard.module';
import ContactsIndex from '../../modules/contact/list/ContactsIndex.module';
import StageIcon from '../icons/Stage.icon.asset';
import CampaignIndex from '../../modules/campaign/CampaignIndex.module';
import StageModule from '../../modules/pipeline/stage/PipelineIndex.module';
import TaskIndex from '../../modules/task/TaskIndex.module';
import BottomSheetSelect from '../../components/app/BottomSheetSelect.app.component';
import InboxIndex from '../../modules/inbox/InboxIndex.module';
import inboxThreadModel from '../../services/models/InboxThread.model';
import FavIcon from '../icons/Favorite.icon.asset';
import CheckCircleIcon from '../icons/CheckCircle.icon.asset';
import IncomingCallIcon from '../icons/IncomingCall.icon.asset';
import OutgoingCallIcon from '../icons/OutgoingCall.icon.asset';
import CalenderIcon from '../icons/Calender.icon.asset';
import HistoryIcon from '../icons/History.icon.asset';
import UsersIcon from '../icons/Users.icon.asset';
import MoreIcon from '../icons/More.icon.asset';
import CompanyIcon from '../icons/Comapany.icon.asset';
import SourceIcon from '../icons/Source.icon.asset';
import {textInput} from '../styles/properties.asset';
import ContactConversations from '../../modules/contact/details/tab-details/conversations/Conversations.contact';

const drawerList = [
  [
    {
      icon: <DashboardIcon fill={colors.drawer.icon} />,
      title: 'Dashboard',
      value: screens.dashboard,
      redirect: true,
      hasBadge: false,
    },
  ],
  [
    {
      icon: <ContactsIcon fill={colors.drawer.icon} />,
      title: 'Contacts',
      value: screens.contacts,
      redirect: true,
    },
    {
      icon: <InboxIcon fill={colors.drawer.icon} />,
      title: 'Inbox',
      value: screens.inbox,
      redirect: true,
      hasBadge: true,
    },
    {
      icon: <CampaignIcon fill={colors.drawer.icon} />,
      title: 'Campaigns',
      value: screens.campaigns,
      hasBadge: false,
      redirect: true,
    },
    {
      icon: <DealIcon fill={colors.drawer.icon} />,
      title: 'Deals',
      value: screens.stage,
      hasBadge: false,
      redirect: true,
    },
  ],
  [
    {
      icon: <TasksIcon fill={colors.drawer.icon} />,
      title: 'Tasks',
      value: screens.task,
      redirect: true,
      hasBadge: false,
    },
    // {
    //   icon: <TimelineIcon />,
    //   title: 'Pipeline',
    //   value: screens.pipeline,
    //   redirect: true,
    // },
    // {
    //   icon: <CallFilled />,
    //   title: 'Call History',
    //   value: screens.callHistory,
    //   redirect: true,
    // },
  ],
];

const addContactOptions = [
  {
    title: 'Full Name',
    name: 'name',
    icon: <UserIcon height={20} width={20} fill={colors.gray4} />,
    validationRules: () => {},
    inputProps: {},
    priority: 1,
  },
  {
    title: 'Phone Number',
    name: 'number',
    icon: <CallIcon height={20} width={20} fill={colors.gray4} />,
    validationRules: () => {},
    inputProps: {keyboardType: textInput.keyboard.numberPad},
    priority: 1,
  },
  {
    title: 'Email Address',
    name: 'email',
    icon: <EmailIcon height={20} width={20} fill={colors.gray4} />,
    validationRules: () => {},
    inputProps: {keyboardType: 'email-address'},
    priority: 1,
  },
  {
    title: 'Company Name',
    name: 'companyName',
    icon: <CompanyIcon height={20} width={20} fill={colors.gray4} />,
    validationRules: () => {},
    inputProps: {},
    priority: 1,
  },
  {
    title: 'Country',
    name: 'country',
    validationRules: () => {},
    inputProps: {},
  },
  {
    title: 'State',
    name: 'state',
    validationRules: () => {},
    inputProps: {},
  },
  {
    group: true,
    list: [
      {
        title: 'City',
        name: 'city',
        validationRules: () => {},
        inputProps: {},
      },
      {
        title: 'ZIP Code',
        name: 'zip',
        validationRules: () => {},
        inputProps: {},
      },
    ],
  },
  {
    title: 'Street Address',
    name: 'address',
    validationRules: () => {},
    inputProps: {},
  },
  {
    title: 'Deal Value',
    name: 'dealValue',
    validationRules: () => {},
    inputProps: {keyboardType: textInput.keyboard.numeric},
  },
];

const taskTabTitles = [
  {name: 'All', value: 'all'},
  {name: 'Today', value: 'today'},
  {name: 'Overdue', value: 'overdue'},
  {name: 'Done', value: 'completed'},
];
const campaignTabTitles = [
  {name: 'All', value: ''},
  {name: 'Running', value: 3},
  {name: 'Paused', value: 5},
];
const contactTabTitles = [
  {name: 'About', value: 1, Component: ContactAbout},
  // {name: 'Schedules', value: 2, Component: ContactSchedules},
  {name: 'Notes', value: 3, Component: ContactNotes},
  {name: 'Tasks', value: 4, Component: ContactTasks},
  {name: 'Conversations', value: 5, Component: ContactConversations},
];
const contactMoreActionOptions = [
  {
    Icon: ActivityIcon,
    text: titles.addTask,
    fill: colors.primary,
  },
  {
    Icon: NotesIcon,
    text: titles.addNote,
    fill: colors.primary,
  },
  {
    Icon: ChatIcon,
    text: titles.takeMeToConversation,
    fill: colors.primary,
  },
  {
    Icon: CampaignIcon,
    text: titles.addContactToCampaign,
    fill: colors.primary,
  },
  {
    Icon: DealIcon,
    text: titles.addPipelineToContact,
    fill: colors.primary,
  },
];
const contactTaskTabOptions = [
  {name: 'All', value: 'all'},
  {name: 'Due', value: 'overdue'},
  {name: 'Complete', value: 'completed'},
];
const inboxTaskTabOptions = [
  {name: 'All', value: inboxThreadModel.inboxTab.all},
  {name: 'Unread', value: inboxThreadModel.inboxTab.unread},
  {name: 'Favorites', value: inboxThreadModel.inboxTab.favourite},
  {name: 'Archived', value: inboxThreadModel.inboxTab.archived},
];
const taskTitles = {
  1: {title: 'Call', Icon: CallIcon, type: 1},
  2: {title: 'Appointment', Icon: CalenderIcon, type: 2},
  3: {title: 'Task', Icon: ActivityIcon, type: 3},
  4: {title: 'Deadline', Icon: HistoryIcon, type: 4},
  5: {title: 'Email', Icon: EmailIcon, type: 5},
  6: {title: 'Followup', Icon: UsersIcon, type: 6},
  7: {title: 'Others', Icon: MoreIcon, type: 7},
};
const inboxActionOptions = [
  {name: 'Inbox', icon: <ArchiveIcon />, value: 'inbox'},
  {name: 'Archive', icon: <InboxIcon fill={colors.gray0} />, value: 'archive'},
  {
    name: 'Mark as important',
    icon: <FavIcon height={24} width={24} />,
    value: 'important',
  },
  {
    name: 'Remove from important',
    icon: <FavIcon fill={colors.error1} height={24} width={24} />,
    value: 'unimportant',
  },
  {name: 'Mark as Read', icon: <CheckCircleIcon />, value: 'read'},
  {name: 'Mark as Unread', icon: <CheckCircleIcon />, value: 'unread'},
  {
    name: 'View Profile',
    icon: <UserIcon fill={colors.gray0} />,
    value: 'profile',
  },
];
const additionalContactRelation = ['HOME', 'WORK', 'OTHERS'];
const campaignBottomSheetOptions = [
  {id: 3, name: 'Running', icon: <PlayIcon />},
  {id: 5, name: 'Pause', icon: <PauseIcon />},
  {id: 0, name: 'Unsubscribed', icon: <CloseIcon fill={colors.error1} />},
];
const profileCustomField = {
  name: {
    title: 'Your Name',
    description: 'This is the name other people will see you as.',
    field: [
      {
        title: 'First Name',
        name: 'firstName',
        inputProps: {},
        type: CustomFieldModel.TYPE_TEXT,
        placeholder: 'First Name',
      },
      {
        title: 'Last Name',
        name: 'lastName',
        inputProps: {},
        type: CustomFieldModel.TYPE_TEXT,
        placeholder: 'Last Name',
      },
    ],
  },
  phone: {
    title: 'Your Phone',
    description: 'Personalize your experience.',
    field: {
      title: 'Phone Number',
      name: 'number',
      inputProps: {},
      type: CustomFieldModel.TYPE_PHONE,
      placeholder: 'Enter Number',
    },
  },
  company_name: {
    title: 'Your Company',
    description: 'Personalize your experience.',
    field: {
      title: 'Company Name',
      name: 'company_name',
      inputProps: {},
      type: CustomFieldModel.TYPE_TEXT,
      placeholder: 'Company',
    },
  },
  url: {
    title: 'Company Website',
    description: 'Personalize your experience.',
    field: {
      title: 'Website Link',
      name: 'url',
      inputProps: {},
      type: CustomFieldModel.TYPE_URL,
      placeholder: 'Website Link',
    },
  },
  address: {
    title: 'Your Address',
    description: 'Personalize your experience.',
    field: {
      title: 'Street Address',
      name: 'address',
      inputProps: {},
      type: CustomFieldModel.TYPE_MULTILINE,
      placeholder: 'Address',
    },
  },
};
const campaignResponseOptions = [
  {id: 1, name: 'Continue'},
  {id: 2, name: 'Pause'},
  {id: 0, name: 'Unsubscribed'},
];
const pipelineBottomSheetOptions = [
  {
    name: 'Won',
    value: 2,
    Icon: ThumbsUpIcon,
    bg: colors.success1,
    border: colors.success1,
  },
  {
    name: 'Lost',
    value: 3,
    Icon: ThumbsDownIcon,
    bg: colors.error1,
    border: colors.error1,
  },
  {
    name: 'Move',
    value: 4,
    Icon: RightArrowIcon,
    bg: colors.primary,
    border: colors.primary,
  },
];
const probability = [
  {value: 1, title: '10%'},
  {value: 2, title: '20%'},
  {value: 3, title: '30%'},
  {value: 4, title: '40%'},
  {value: 5, title: '50%'},
  {value: 6, title: '60%'},
  {value: 7, title: '70%'},
  {value: 8, title: '80%'},
  {value: 9, title: '90%'},
  {value: 10, title: 'WON'},
  {value: 11, title: 'LOST'},
];
const probabilityPercentage = {
  1: '10%',
  2: '20%',
  3: '30%',
  4: '40%',
  5: '50%',
  6: '60%',
  7: '70%',
  8: '80%',
  9: '90%',
  10: 'WON',
  11: 'LOST',
};

const addStageForms = [
  {
    title: 'Stage Name',
    name: 'stageName',
    inputProps: {},
  },
  {
    title: 'Pipeline',
    name: 'pipeline',
    inputProps: {},
    dropdown: true,
    placeholder: 'Select one',
    Component: BottomSheetSelect,
    options: [],
  },
  {
    title: 'Probability',
    name: 'probability',
    inputProps: {},
    dropdown: true,
    placeholder: 'Select one',
    Component: BottomSheetSelect,
    options: {data: probability, titleField: 'title'},
  },
  {
    title: 'Background Color',
    name: 'colorCode',
    inputProps: {},
    dropdown: true,
    colorPicker: true,
    placeholder: 'Select one',
    Component: CustomColorPicker,
    options: STAGE_COLORS,
  },
  {
    title: 'Text Color',
    name: 'textColor',
    inputProps: {},
    dropdown: true,
    colorPicker: true,
    placeholder: 'Select one',
    Component: CustomColorPicker,
    options: STAGE_COLORS,
  },
];

const addDealForms = [
  {
    title: 'Select Contact',
    name: 'contact',
    inputProps: {},
    type: CustomFieldModel.TYPE_DROPDOWN,
    options: [],
    Component: BottomSheetSelect,
    placeholder: 'Select one',
  },
  {
    title: 'Title',
    name: 'title',
    inputProps: {},
    type: CustomFieldModel.TYPE_TEXT,
    placeholder: 'Deal Title',
  },
  {
    title: 'Pipeline',
    name: 'pipeline',
    inputProps: {},
    placeholder: 'Select one',
    options: [],
    Component: BottomSheetSelect,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
  {
    title: 'Stage',
    name: 'stage',
    inputProps: {},
    placeholder: 'Select one',
    options: [],
    Component: BottomSheetSelect,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
  {
    title: 'Deal Value',
    name: 'dealValue',
    inputProps: {},
    type: CustomFieldModel.TYPE_NUMBER,
  },
  {
    title: 'Closing Date',
    name: 'closingDate',
    inputProps: {},
    placeholder: 'dd/mm/yyyy',
    type: CustomFieldModel.TYPE_DATE,
  },
  {
    title: 'Assign Color',
    name: 'bgColor',
    inputProps: {},
    placeholder: 'Select one',
    Component: CustomColorPicker,
    options: DEAL_COLORS,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
];
const addTaskForms = [
  {
    title: 'Task Title',
    name: 'title',
    inputProps: {},
    placeholder: 'Task Title',
    type: CustomFieldModel.TYPE_TEXT,
  },
  {
    title: 'Task Type',
    name: 'type',
    inputProps: {},
    placeholder: 'Select Type',
    options: [],
    Component: BottomSheetSelect,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
  {
    title: 'Assign To',
    name: 'assignTo',
    inputProps: {},
    placeholder: 'Select Assign',
    options: [],
    Component: BottomSheetSelect,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
  {
    title: 'Select Contact',
    name: 'contact',
    inputProps: {},
    placeholder: 'Select Contact',
    options: [],
    Component: BottomSheetSelect,
    type: CustomFieldModel.TYPE_DROPDOWN,
  },
  {
    title: 'Due Date',
    name: 'date',
    inputProps: {},
    placeholder: 'dd/mm/yyyy',
    type: CustomFieldModel.TYPE_DATE,
  },
  {
    title: 'Time',
    name: 'time',
    inputProps: {},
    placeholder: 'hh"mm',
    type: CustomFieldModel.TYPE_TIME,
  },
  {
    title: 'Description',
    name: 'description',
    inputProps: {},
    type: CustomFieldModel.TYPE_MULTILINE,
  },
];
const keypads = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'];
const stageTabOptions = [
  {name: 'Active', value: 1},
  {name: 'Won', value: 2},
  {name: 'Lost', value: 3},
];
const tabOptions = [
  {
    name: screens.menu,
    title: 'Menu',
    Component: EmptyTabScreen,
    icon: MenuIcon,
    hideIcon: false,
    hasBadge: true,
  },
  {
    name: screens.add,
    title: 'Add',
    Component: EmptyTabScreen,
    icon: AddIcon,
    hideIcon: false,
    hasBadge: false,
  },
  {
    name: screens.callKeyboard,
    title: 'Dialer',
    Component: CallKeyboard,
    icon: DialerIcon,
    hideIcon: false,
    hasBadge: false,
  },
  {
    name: screens.dashboard,
    title: 'Dashboard',
    Component: Dashboard,
    icon: DashboardIcon,
    hideIcon: true,
    hasBadge: false,
  },
  {
    name: screens.contacts,
    title: 'Contacts',
    Component: ContactsIndex,
    icon: DashboardIcon,
    hideIcon: true,
    hasBadge: false,
  },
  {
    name: screens.inbox,
    title: 'Inbox',
    Component: InboxIndex,
    icon: InboxIcon,
    hideIcon: true,
    hasBadge: false,
  },
  {
    name: screens.campaigns,
    title: 'Campaigns',
    Component: CampaignIndex,
    icon: CampaignIcon,
    hideIcon: true,
    hasBadge: false,
  },
  {
    name: screens.stage,
    title: 'Deals',
    Component: StageModule,
    icon: DealIcon,
    hideIcon: true,
    hasBadge: false,
  },
  {
    name: screens.task,
    title: 'Tasks',
    Component: TaskIndex,
    icon: TasksIcon,
    hideIcon: true,
    hasBadge: false,
  },
];
const selectScheduleOptions = [
  {title: 'Today', value: 'today'},
  {title: 'This week', value: 'thisWeek'},
  {title: 'This month', value: 'thisMonth'},
  {title: 'This year', value: 'thisYear'},
  {title: 'All Time', value: 'allTime'},
];
const addItemOptions = [
  {
    name: 'Contact',
    screens: screens.addContact,
    Icon: UserIcon,
  },
  {
    name: 'Pipeline',
    screens: screens.addPipeline,
    Icon: SourceIcon,
  },
  {
    name: 'Stage',
    screens: screens.addStage,
    Icon: StageIcon,
  },
  {
    name: 'Deal',
    screens: screens.addDeal,
    Icon: DealIcon,
  },
  {
    name: 'Contact To Campaign',
    screens: screens.addContactToCampaign,
    Icon: UsersIcon,
    options: {from: true},
  },
  {
    name: 'Task',
    screens: screens.addTask,
    Icon: TasksIcon,
  },
  {
    name: 'Note',
    screens: screens.addNote,
    Icon: NotesIcon,
  },
  {
    name: 'Appointment',
    screens: screens.addTask,
    Icon: CalenderIcon,
    options: {task: 2},
  },
];
const renderCallStatusIcon = {
  1: <IncomingCallIcon />,
  2: <IncomingCallIcon fill={colors.error1} />,
  3: <OutgoingCallIcon />,
  4: <OutgoingCallIcon fill={colors.error1} />,
};

export {
  drawerList,
  taskTabTitles,
  addContactOptions,
  contactMoreActionOptions,
  contactTabTitles,
  contactTaskTabOptions,
  additionalContactRelation,
  inboxTaskTabOptions,
  inboxActionOptions,
  campaignBottomSheetOptions,
  pipelineBottomSheetOptions,
  campaignTabTitles,
  campaignResponseOptions,
  addStageForms,
  probability,
  addDealForms,
  keypads,
  stageTabOptions,
  profileCustomField,
  addTaskForms,
  tabOptions,
  selectScheduleOptions,
  addItemOptions,
  probabilityPercentage,
  renderCallStatusIcon,
  taskTitles,
};

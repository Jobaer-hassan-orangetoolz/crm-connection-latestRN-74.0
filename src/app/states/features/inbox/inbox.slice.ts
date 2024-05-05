import {commonReducers} from './../../common.reducer';
import {commonListStates} from './../../common.state';
import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
import {inboxTaskTabOptions} from '../../../assets/js/dropdown.data';
import {inboxIdObj} from '../../../services/models/InboxThread.model';
const inboxStates = {
  ...commonListStates,
  tab: inboxTaskTabOptions[0].value,
  search: '',
};
const inboxSlice = customCreateSlice({
  name: sliceName.inboxSlice,
  initialState: inboxStates,
  reducers: {
    ...commonReducers,
    storeInboxTabValue: (state: any, payload: CustomAnyAction) => {
      state.tab = payload.payload;
      state.page = 1;
      state.hasMore = false;
      state.gettingMore = false;
      state.isLoading = true;
      state.list = [];
    },
    storeNewMessage: (state: any, payload: any) => {
      const item = payload.payload;
      let fullData = [...state.list];

      if (Object.hasOwn(inboxIdObj, item.contact_id)) {
        fullData.splice(inboxIdObj[item.contact_id], 1);
      }
      state.list = [{...item}, ...fullData];
      inboxIdObj[item.contact_id] = 0;
    },
    archiveUnArchiveMessage: () => {},
    successArchive: (state: any, payload: any) => {
      const {index} = payload.payload; //status is here.
      if (index === -1) {
        return;
      }
      let prevData = [...state.list];
      prevData.splice(index, 1);
      state.list = prevData;
    },
    importantUnimportantMessage: () => {},
    successImportant: (state: any, payload: any) => {
      const {index, status} = payload.payload;
      if (index === -1) {
        return;
      }
      const updatedData = [...state.list];
      updatedData[index] = {
        ...updatedData[index],
        contactInfo: {...updatedData[index]?.contactInfo, isFavourite: status},
      };
      updatedData;
      state.list = [...updatedData];
    },
    searchInboxList: (state: any, payload: any) => {
      const text = payload.payload;
      state.search = text;
      state.page = 1;
      state.hasMore = false;
      state.gettingMore = false;
      state.isLoading = true;
      state.list = [];
    },
    readUnreadMessage: () => {},
    setReadUnread: (state: any, payload: any) => {
      const {index, status} = payload.payload;
      if (index === -1) {
        return;
      }
      state.list[index].isRead = status === true ? 1 : 0;
    },
    incomingMessage: (state: any, payload: any) => {
      state.list = [{...payload.payload}, ...state.list];
    },
  },
});
export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  clearAction,
  storeInboxTabValue,
  setReadUnread,
  storeNewMessage,
  archiveUnArchiveMessage,
  searchInboxList,
  successArchive,
  importantUnimportantMessage,
  successImportant,
  readUnreadMessage,
  incomingMessage,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
  storeInboxTabValue: Function;
  setReadUnread: Function;
  storeNewMessage: Function;
  archiveUnArchiveMessage: Function;
  searchInboxList: Function;
  successArchive: Function;
  importantUnimportantMessage: Function;
  successImportant: Function;
  readUnreadMessage: Function;
  incomingMessage: Function;
} = inboxSlice.actions;
export default inboxSlice.reducer;

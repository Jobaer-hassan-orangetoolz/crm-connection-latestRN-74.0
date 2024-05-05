import {taskTabTitles} from '../../../assets/js/dropdown.data';
import {momentTimezone} from '../../../packages/momentTimezone.package';
import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const taskSlice = customCreateSlice({
  name: sliceName.taskSlice,
  initialState: {...commonListStates, tab: taskTabTitles[0].value},
  reducers: {
    ...commonReducers,
    changeTaskTab: (state: CommonState, payload: CustomAnyAction) => {
      state.tab = payload.payload.type;
      state.list = [];
      state.isLoading = true;
      state.hasMore = false;
    },
    deleteTask: (state: CommonState, payload: CustomAnyAction) => {
      const {id, index} = payload.payload;
      if (index || index === 0) {
        state.list.splice(index, 1);
      } else {
        const item = state.list.find((_item: any) => {
          return _item.id === id;
        });
        const _index = state.list.indexOf(item);
        state.list.splice(_index, 1);
      }
    },
    updateTask: (state: CommonState, payload: CustomAnyAction) => {
      const {index, item} = payload.payload;
      if (state.tab === 'overdue') {
        const date = momentTimezone();
        const isSimilar = momentTimezone(item?.date).isSameOrAfter(date);
        isSimilar ? state.list.splice(index, 1) : (state.list[index] = item);
      } else {
        state.list[index] = item;
      }
    },
    addTask: (state: CommonState, payload: CustomAnyAction) => {
      const {item} = payload.payload;
      state.list.unshift(item);
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
  changeTaskTab,
  deleteTask,
  updateTask,
  addTask,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  gettingMoreAction: Function;
  refreshingAction: Function;
  clearAction: Function;
  deleteTask: Function;
  changeTaskTab: Function;
  updateTask: Function;
  addTask: Function;
} = taskSlice.actions;

export default taskSlice.reducer;

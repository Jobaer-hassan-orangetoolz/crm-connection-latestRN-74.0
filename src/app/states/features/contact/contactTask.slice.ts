import {contactTaskTabOptions} from '../../../assets/js/dropdown.data';
import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';
const initialState = {
  ...commonListStates,
  tab: contactTaskTabOptions[0].value,
};
const contactTaskSlice = customCreateSlice({
  name: sliceName.contactTaskSlice,
  initialState,
  reducers: {
    ...commonReducers,
    storeTaskTabValue: (state: CommonState, payload: CustomAnyAction) => {
      const {type} = payload.payload;
      state.tab = type;
      state.list = [];
      state.isLoading = true;
    },
    updateContactMarkAsDone: (state: CommonState, payload: CustomAnyAction) => {
      const index = payload.payload;
      state.list.splice(index, 1);
    },
    updateContactTask: (state: CommonState, payload: CustomAnyAction) => {
      const {index, item} = payload.payload;
      state.list[index] = item;
    },
    addContactTask: (state: CommonState, payload: CustomAnyAction) => {
      const {item} = payload.payload;
      state.list.unshift(item);
    },
    clearAction: (state: any) => {
      for (const property in commonListStates) {
        state[property] = commonListStates[property];
      }
      state.tab = initialState.tab;
    },
  },
});

export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  storeTaskTabValue,
  updateContactMarkAsDone,
  clearAction,
  updateContactTask,
  addContactTask,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  storeTaskTabValue: Function;
  updateContactMarkAsDone: Function;
  clearAction: Function;
  updateContactTask: Function;
  addContactTask: Function;
} = contactTaskSlice.actions;

export default contactTaskSlice.reducer;

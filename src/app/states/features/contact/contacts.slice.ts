import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const contactsSlice = customCreateSlice({
  name: sliceName.contactsSlice,
  initialState: {...commonListStates, search: ''},
  reducers: {
    ...commonReducers,
    deleteContact: (state: CommonState, payload: CustomAnyAction) => {
      const {index, id} = payload.payload;
      let contactsArray = state.list;
      if (index || index === 0) {
        contactsArray.splice(index, 1);
      } else {
        state.list = contactsArray.filter(contact => {
          return contact.id !== id;
        });
      }
    },
    storeContactSearchText: (state: CommonState, payload: CustomAnyAction) => {
      state.search = payload.payload;
      state.hasMore = false;
    },
    clearAction: (state: CommonState) => {
      for (const property in commonListStates) {
        state[property] = commonListStates[property];
      }
      state.search = '';
    },
  },
});

export const {
  isGettingAction,
  gettingSuccess,
  deleteContact,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  storeContactSearchText,
  clearAction,
  searchingAction,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  deleteContact: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  storeContactSearchText: Function;
  searchingAction: Function;
  clearAction: Function;
} = contactsSlice.actions;

export default contactsSlice.reducer;

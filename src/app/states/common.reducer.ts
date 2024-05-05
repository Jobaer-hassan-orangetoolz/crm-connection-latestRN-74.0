import {CommonState, commonListStates} from './common.state';

export const commonReducers = {
  isGettingAction: (state: CommonState, action: any) => {
    const {payload} = action;
    const flag = payload?.isLoading ?? true;
    state.isLoading = flag;
  },
  gettingSuccess: (state: CommonState, action: any) => {
    const {payload} = action;
    let list = [];
    if (state.page > 1) {
      list = (state.list || []).concat(Array.isArray(payload) ? payload : []);
    } else {
      list = Array.isArray(payload) ? payload : [];
    }
    state.gettingMore = false;
    state.refreshing = false;
    state.isGetting = true;
    state.isLoading = false;
    state.list = [...list];
    state.page = state.page + 1;
    state.hasMore = payload.length >= state.perPage ? true : false;
  },
  gettingError: (state: CommonState) => {
    state.gettingMore = false;
    state.refreshing = false;
    state.isGetting = true;
    state.isLoading = false;
  },
  gettingMoreAction: (state: CommonState) => {
    state.gettingMore = true;
    state.hasMore = false;
  },
  refreshingAction: (state: CommonState) => {
    state.page = 1;
    state.hasMore = false;
    state.refreshing = true;
    state.gettingMore = false;
  },
  searchingAction: (state: CommonState) => {
    state.page = 1;
    state.perPage = 10;
    state.isLoading = true;
    state.list = commonListStates.list;
    state.hasMore = false;
  },
  clearAction: (state: CommonState) => {
    for (const property in commonListStates) {
      state[property] = commonListStates[property];
    }
  },
};

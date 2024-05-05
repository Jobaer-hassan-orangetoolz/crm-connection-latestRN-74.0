export type CommonState = {
  list: any[];
  isGetting: boolean;
  isLoading: boolean;
  page: number;
  perPage: number;
  hasMore: boolean;
  gettingMore: boolean;
  refreshing: boolean;
  [key: string]: any;
};

export const commonListStates: CommonState = {
  list: [],
  isGetting: false,
  isLoading: false,
  page: 1,
  perPage: 10,
  hasMore: false,
  gettingMore: false,
  refreshing: false,
};

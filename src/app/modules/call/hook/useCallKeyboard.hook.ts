import {useRef, useState} from 'react';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
interface stateInterface {
  list: any[];
  loading: boolean;
  hasMore: boolean;
  number: string;
  dialNumber: string;
}
declare global {
  var getContactsList: (value: string) => void;
}
const useCallKeyboard = () => {
  const [state, setState] = useState<stateInterface>({
    list: [],
    loading: false,
    hasMore: false,
    number: '',
    dialNumber: '',
  });
  const pageList = useRef<{page: number; perPage: number}>({
    page: 1,
    perPage: 10,
  });
  const getData = async (value: string) => {
    const {page, perPage} = pageList.current;
    const result = await contactApiHelper.getContactList({
      page: page,
      perPage: perPage,
      search: value,
    });
    const {status, body} = result as apiResponse;
    if (status) {
      let array: any[] = [];
      if (page > 1) {
        array = (state.list || []).concat(Array.isArray(body) ? body : []);
      } else {
        array = Array.isArray(body) ? body : [];
      }
      state.list = [...array];
      pageList.current.page += 1;
      setState((prev: stateInterface) => ({
        ...prev,
        loading: false,
        list: [...array],
        hasMore: body?.length >= perPage ? true : false,
      }));
    } else {
      setState((prev: stateInterface) => ({
        ...prev,
        loading: false,
        hasMore: false,
        list: [],
      }));
    }
  };
  global.getContactsList = (value: string) => {
    setState((prev: stateInterface) => ({
      ...prev,
      loading: value ? true : false,
      number: value,
      hasMore: false,
      list: [],
      dialNumber: '',
    }));
    pageList.current = {page: 1, perPage: 20};
    value && getData(value);
  };
  const loadMore = () => {
    state.hasMore && getData(state.number);
  };
  const handleSetDialNumber = (value: string) => {
    setState((prev: stateInterface) => ({
      ...prev,
      dialNumber: value,
    }));
  };
  const {list, loading, dialNumber} = state;
  return {list, loading, loadMore, dialNumber, handleSetDialNumber};
};

export default useCallKeyboard;

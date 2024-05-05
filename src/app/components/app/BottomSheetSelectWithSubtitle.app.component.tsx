/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import {useIsMounted} from '../../utilities/hooks/useIsMounted.hook';
import {debounceHandler, isEmpty} from '../../utilities/helper.utility';
import InputWithIcon from '../core/input/InputWithIcon.core.component';
import SearchIcon from '../../assets/icons/Search.icon.asset';
import CrossIcon from '../../assets/icons/Cross.icon.asset';
import {placeholders} from '../../assets/js/placeholders.message';
import {messages} from '../../assets/js/messages.message';
import EmptyContent from '../core/EmptyContent.core.component';
import {typographies} from '../../assets/styles/typographies.style.asset';
import LeftArrowIcon from '../../assets/icons/LeftArrow.icon.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {titles} from '../../assets/js/titles.message';
import CheckIcon from '../../assets/icons/Check.icon.asset';
interface optionsProps {
  titleField: 'value' | 'FULL__DATA';
  item: any;
  name?: string;
  formatOptions?: Function;
  onSelect?: (name: any, value: any) => void;
  titleFieldFormatter?: Function;
  selectedValue?: string;
  subtitleField?: string;
}
interface componentProps {
  onChange: (params: any) => void;
  name?: string;
  extraData: {getData: boolean; data: any[]};
  options?: {
    search?: boolean;
    refreshing?: boolean;
    data?: any[];
    selectedValue?: string;
    titleField?: 'value' | 'FULL__DATA' | any;
    titleFieldFormatter?: Function;
    formatter?: any;
    flatList?: boolean;
    title?: string;
    refreshButton?: boolean;
    getDataHandler: (
      params: {
        page: number;
        perPage: number;
        query?: any;
      },
      callback: (res: any) => void,
    ) => void;
    subtitleField?: string;
  };

  perPageNumber?: number;
}
const EachOption = ({
  titleField = 'value',
  onSelect = () => {},
  item,
  name = '',
  titleFieldFormatter,
  selectedValue,
  subtitleField,
}: optionsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          ...customPadding(10, 0, 10, 0),
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
      ]}
      onPress={() => {
        onSelect(item, name);
        global.showBottomSheet({flag: false});
      }}>
      <View>
        {subtitleField && (
          <Text style={typographies.bodyMediumBold}>{item[subtitleField]}</Text>
        )}
        <Text
          style={[
            typographies.bodyMedium,
            subtitleField && {color: colors.gray5},
          ]}>
          {titleFieldFormatter
            ? titleFieldFormatter(item)
            : titleField === 'FULL__DATA'
            ? item
            : item[titleField]}
        </Text>
      </View>
      {(titleFieldFormatter
        ? titleFieldFormatter(item) === selectedValue
        : titleField === 'FULL__DATA'
        ? item === selectedValue
        : item[titleField] === selectedValue) && (
        <CheckIcon fill={colors.primary} />
      )}
    </TouchableOpacity>
  );
};
const BottomSheetSelectWithSubtitle: React.FC<componentProps> = ({
  options = {},
  perPageNumber = 10,
  onChange = () => {},
  name = '',
  extraData = {},
}) => {
  const {
    search = false,
    refreshing = false,
    data = [],
    titleField = 'FULL__DATA',
    getDataHandler = () => {},
    formatter,
    titleFieldFormatter,
    flatList = false,
    title = '',
    selectedValue = '',
    refreshButton = false,
    subtitleField = '',
  } = options;
  const isMount = useIsMounted();
  const page = useRef<number>(isEmpty(data) ? 1 : 2);
  const inputRef = useRef<any>();
  const searchText = useRef<string>('');
  const hasMore = useRef<boolean>(false);
  const perPage = useRef<number>(perPageNumber);
  const [list, setList] = useState<any[]>(data || []);
  const [isLoading, setIsLoading] = useState<boolean>(
    isEmpty(data) ? true : false,
  );
  const [isGettingMore, setIsGettingMore] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const apiCall = () => {
    getDataHandler(
      {
        page: page.current,
        perPage: perPage.current,
        search: searchText.current,
      } as {
        page: number;
        perPage: number;
        query?: any;
      },
      (res: any) => {
        if (res.status) {
          let mergeData: any[] = [...list];
          let body: any[] = [];
          if (res.body) {
            body = [...res.body];
          }
          if (page.current === 1) {
            mergeData = [];
          }
          if ('append') {
            mergeData = [...mergeData, ...body];
          } else {
            mergeData = [...body, ...mergeData];
          }
          setList(mergeData);
          if (res.body && res.body.length >= perPage.current) {
            hasMore.current = true;
            page.current = page.current + 1;
          } else {
            hasMore.current = false;
          }
        }
        setIsRefreshing(false);
        setIsGettingMore(false);
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    isEmpty(data) && apiCall();
  }, []);
  useEffect(() => {
    if (isMount && isGettingMore) {
      apiCall();
    }
  }, [isGettingMore]);
  const handleSetSearch = (value: string) => {
    searchText.current = value;
    page.current = 1;
    perPage.current = perPageNumber;
    apiCall();
  };
  const handleDebounce = debounceHandler(
    (value: string) => handleSetSearch(value),
    500,
  );
  const onRefresh = () => {
    searchText.current = '';
    page.current = 1;
    perPage.current = perPageNumber;
    apiCall();
  };
  const loadMore = () => {
    apiCall();
  };
  useEffect(() => {
    if (extraData.getData) {
      setList(extraData.data);
    }
  }, [extraData]);
  return (
    <KeyboardAvoidingView behavior="height" enabled={true}>
      <View style={{...customPadding(0, 20, 10, 20)}}>
        <View style={styles.topHeaderCont}>
          <View style={styles.topHeader}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                global.showBottomSheet({flag: false});
              }}>
              <LeftArrowIcon />
            </TouchableOpacity>
            {title && (
              <Text
                numberOfLines={1}
                style={[typographies.bodyLargeBold, globalStyles.flexShrink1]}>
                {title}
              </Text>
            )}
          </View>
          {refreshButton && (
            <TouchableOpacity onPress={onRefresh} activeOpacity={0.5}>
              <Text
                style={[typographies.bodyMediumBold, {color: colors.primary}]}>
                {titles.refresh}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {search && (
          <InputWithIcon
            inputProps={{ref: inputRef}}
            defaultValue={searchText.current}
            style={{...customMargin(8, 0, 2, 0)}}
            leftIcon={<SearchIcon />}
            rightIcon={searchText.current && <CrossIcon />}
            placeholder={placeholders.search}
            rightHandler={() => {
              inputRef.current?.clear();
              handleSetSearch('');
            }}
            onChangeText={handleDebounce}
          />
        )}
        {!flatList ? (
          <ScrollView
            refreshControl={
              refreshing && (
                <RefreshControl
                  onRefresh={onRefresh}
                  refreshing={isRefreshing}
                />
              )
            }
            contentContainerStyle={
              list?.length > 0
                ? {...customPadding(8)}
                : globalStyles.emptyFlexBox
            }
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag">
            {isLoading ? (
              <ActivityIndicator />
            ) : !isEmpty(list) ? (
              list.map((item: any, index: any) => {
                return (
                  <EachOption
                    item={formatter ? formatter(item) : item}
                    name={name}
                    selectedValue={selectedValue}
                    titleFieldFormatter={titleFieldFormatter}
                    titleField={titleField}
                    onSelect={onChange}
                    key={index}
                  />
                );
              })
            ) : (
              <EmptyContent text={messages.noDataFound} />
            )}
          </ScrollView>
        ) : (
          <FlatList
            data={list}
            refreshing={refreshing && isRefreshing}
            onRefresh={refreshing && onRefresh}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={
              list?.length > 0
                ? {...customPadding(8)}
                : globalStyles.emptyFlexBox
            }
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator />
              ) : (
                <EmptyContent text={messages.noDataFound} />
              )
            }
            initialNumToRender={12}
            renderItem={({item, index}: {item: any; index: number}) => {
              return (
                <EachOption
                  item={formatter ? formatter(item) : item}
                  titleField={titleField}
                  selectedValue={selectedValue}
                  onSelect={onChange}
                  name={name}
                  titleFieldFormatter={titleFieldFormatter}
                  key={index}
                  subtitleField={subtitleField}
                />
              );
            }}
            onEndReachedThreshold={1}
            onEndReached={loadMore}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default BottomSheetSelectWithSubtitle;

const styles = StyleSheet.create({
  topHeaderCont: {
    flexDirection: 'row',
    ...customPadding(10, 0, 10),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

import {
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {callStyles as styles} from '../styles/callStyles.style';
import useCallKeyboard from '../hook/useCallKeyboard.hook';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {contactFormatter} from '../../../services/formatter/contact.formatter';
import {placeholders} from '../../../assets/js/placeholders.message';
import {formatPhoneNumber, isEmpty} from '../../../utilities/helper.utility';

const CallNumbersList: React.FC<{textInputRef: any; contactInfo: any}> = ({
  textInputRef,
  contactInfo,
}) => {
  const {list, loading, loadMore, dialNumber, handleSetDialNumber} =
    useCallKeyboard();
  const renderItem = ({item}: {item: any}) => {
    const {name, number, id} = contactFormatter(item);
    const handlePress = () => {
      contactInfo.current = {...contactInfo.current, name, number, id};
      textInputRef.current.setNativeProps({
        text: formatPhoneNumber(number),
      });
      handleSetDialNumber(number);
    };
    return (
      number && (
        <TouchableOpacity
          style={styles.eachContactWrp}
          activeOpacity={0.7}
          onPress={handlePress}>
          <Text style={typographies.bodyMediumBold}>
            {name || placeholders.noNameFound}
          </Text>
          <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
            {formatPhoneNumber(number)}
          </Text>
        </TouchableOpacity>
      )
    );
  };
  const filterList = (value: string) => {
    return isEmpty(list)
      ? []
      : value
      ? list.filter((item: any) => {
          return (
            item.number &&
            item.number.toString().match(new RegExp(value.toString()))
          );
        })
      : list;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(() => renderItem, []);
  return (
    <FlatList
      data={filterList(dialNumber)}
      renderItem={memoizedValue}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      initialNumToRender={3}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={
        list?.length > 0 ? styles.listWrp : globalStyles.activityCenter
      }
      ListEmptyComponent={
        loading ? <ActivityIndicator color={colors.primary} /> : <></>
      }
      onEndReachedThreshold={0.25}
      onEndReached={loadMore}
    />
  );
};

export default memo(CallNumbersList);

import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckIcon from '../../../assets/icons/Check.icon.asset';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {messages} from '../../../assets/js/messages.message';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {titles} from '../../../assets/js/titles.message';
import CallIcon from '../../../assets/icons/Call.icon.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {blockNumberCheck} from '../../../services/models/Contact.modal';
import inboxApiHelper from '../../../services/api/helper/inboxApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
interface optionsProps {
  item: any;
  name?: string;
  onSelect?: (name: any, value: any) => void;
  selectedValue: string;
}
const EachOption = ({
  onSelect = () => {},
  item,
  name = '',
  selectedValue = '',
}: optionsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[globalStyles.rowBetween, {...customPadding(10, 0, 10, 0)}]}
      onPress={() => {
        onSelect(item, name);
      }}>
      <Text style={typographies.bodyMediumBold}>{item.virtualNumber}</Text>
      {item.virtualNumber === selectedValue && (
        <CheckIcon fill={colors.primary} />
      )}
    </TouchableOpacity>
  );
};
const CallBottomSheet: React.FC<{
  name: string;
  number: string;
  id?: number;
  lastNumber?: number;
}> = ({name, number, id, lastNumber}) => {
  const {userVNs} = customUseSelector(userStates);
  const [virtualNumber, setVirtualNumber] = useState<{
    id: number;
    virtualNumber: string;
    loading: boolean;
  }>({id: -0, virtualNumber: '', loading: false});
  const dispatch = customUseDispatch();
  const [validCall, setValidCall] = useState<boolean>(true);
  useEffect(() => {
    if (id) {
      const getInfo = blockNumberCheck.find((_item: any) => {
        return _item.id === id;
      });
      if (!isEmpty(getInfo)) {
        getInfo.isBlock || getInfo.isUnsubscribe ? setValidCall(true) : '';
        getInfo.lastNumber && setVirtualNumber(getInfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getNumber = async (numbers: any[]) => {
    const _number = numbers.find((_item: any) => {
      return _item.id === lastNumber;
    });
    if (_number) {
      setVirtualNumber(_number);
      return;
    } else {
      setVirtualNumber({...virtualNumber, loading: false});
      const result = await inboxApiHelper.contactLastNumber(id);
      const {status, body} = result as apiResponse;
      const contactLastNumber = body;
      if (!isEmpty(contactLastNumber) && status === true) {
        setVirtualNumber({
          ...virtualNumber,
          isLoading: false,
          ...contactLastNumber,
        });
        return;
      } else {
        const _defaultNumber = numbers.find((_item: any) => {
          return _item.isDefault === 1;
        });
        setVirtualNumber({
          ...virtualNumber,
          isLoading: false,
          ..._defaultNumber,
        });
        return;
      }
    }
  };
  useEffect(() => {
    if (!isEmpty(userVNs)) {
      getNumber(userVNs);
    } else {
      dispatch(getUserVirtualNumber(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userVNs]);
  const handleNumberChange = (item: any) => {
    setVirtualNumber(item);
  };
  const handleCall = () => {
    if (isEmpty(virtualNumber.virtualNumber)) {
      return showAlertWithOneAction({
        title: messages.wentWrong,
        body: titles.noVirtualNumber,
      });
    }
    global.showBottomSheet({flag: false});
    global.outgoingCallHandler(
      {
        to: number,
        from: virtualNumber?.virtualNumber,
        contactId: id,
        name: name,
        vnId: virtualNumber?.id,
      },
      'creating',
    );
  };
  const onRefresh = () => {
    dispatch(getUserVirtualNumber(true));
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <EachOption
        item={item}
        selectedValue={virtualNumber.virtualNumber}
        onSelect={handleNumberChange}
      />
    );
  };
  return (
    <View style={{...customPadding(0, 20, 20, 20)}}>
      <View style={styles.topHeaderCont}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              global.showBottomSheet({flag: false});
            }}>
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={[typographies.bodyLargeBold, globalStyles.flexShrink1]}>
            {titles.selectVirtualNumber}
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} activeOpacity={0.5}>
          <Text style={[typographies.bodyMediumBold, {color: colors.primary}]}>
            {titles.refresh}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{maxHeight: rs(200)}}>
        {virtualNumber.loading ? (
          <EmptyContent forLoading={virtualNumber.loading} />
        ) : (
          <FlatList
            data={userVNs}
            renderItem={renderItem}
            contentContainerStyle={
              userVNs?.length > 0
                ? {...customPadding(8)}
                : globalStyles.emptyFlexBox
            }
            initialNumToRender={12}
            keyExtractor={(_, index) => index.toString()}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyContent text={messages.noDataFound} />}
          />
        )}
      </View>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleCall}
          disabled={!validCall}
          style={styles.callCont}>
          <CallIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallBottomSheet;

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
  callCont: {
    width: rs(64),
    height: rs(64),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  alignCenter: {alignItems: 'center', ...customPadding(20)},
});

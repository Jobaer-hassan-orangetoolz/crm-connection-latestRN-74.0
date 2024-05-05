import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {callStyles as styles} from '../styles/callStyles.style';
import {keypads} from '../../../assets/js/dropdown.data';
import HistoryIcon from '../../../assets/icons/History.icon.asset';
import CallFilled from '../../../assets/icons/CallFilled.icon.asset';
import BackSpaceIcon from '../../../assets/icons/BackSpace.icon.asset';
import {formatPhoneNumber, isEmpty} from '../../../utilities/helper.utility';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
declare global {
  var toggleKeyboardVisibility: (flag: boolean) => void;
}
const NumberPad: React.FC<{textInputRef: any; contactInfo: any}> = ({
  textInputRef,
  contactInfo,
}) => {
  let timeoutId: any;
  const navigation = useCustomNavigation<any>();
  const handleNumber = (value: string) => {
    textInputRef.current.setNativeProps({
      text: formatPhoneNumber(value),
    });
    (() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        global.getContactsList(value);
      }, 1500);
    })();
    return () => clearTimeout(timeoutId);
  };
  const handleDialNumberCancel = () => {
    contactInfo.current = {
      ...contactInfo.current,
      number: contactInfo.current.number?.slice(0, -1),
      name: '',
    };
    handleNumber(contactInfo.current.number);
  };
  const handleKeyPress = (item: any) => {
    contactInfo.current.number += item.toString();
    handleNumber(contactInfo.current.number);
  };
  const handleLongPress = () => {
    contactInfo.current = {...contactInfo.current, number: '', name: ''};
    handleNumber('');
  };
  const renderItem = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.eachKey}
        onPress={() => handleKeyPress(item)}
        key={index}
        activeOpacity={0.3}>
        <Text style={typographies.headingLarge}>{item}</Text>
      </TouchableOpacity>
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRender = useMemo(() => renderItem, []);
  const handlePressCall = () => {
    if (isEmpty(contactInfo.current.number)) {
      return;
    }
    global.outgoingCallHandler(
      {
        to: contactInfo.current.number,
        from: contactInfo.current.virtualNumber,
        contactId: contactInfo.current.id,
        name: contactInfo.current.name,
        vnId: contactInfo.current.vnId,
      },
      'creating',
    );
  };
  return (
    <View style={styles.keyboardWrp}>
      <View style={styles.keyWrp}>
        {keypads.map((item, index) => memoizedRender(item, index))}
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.navigate(screens.callHistory as never)}>
          <HistoryIcon height={28} width={28} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.3}
          style={styles.callIcon}
          onPress={handlePressCall}>
          <CallFilled height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={handleDialNumberCancel}
          onLongPress={handleLongPress}>
          <BackSpaceIcon height={28} width={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(NumberPad);

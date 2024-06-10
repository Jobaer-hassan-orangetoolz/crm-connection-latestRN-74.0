import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {callHistoryStyles as styles} from './styles/callHistory.style';
import {globalStyles} from '../../assets/styles/global.style.asset';
import CallBottomSheet from './bottomSheet/Call.bottomSheet';
import {formatDate, isEmpty, timeFormat} from '../../utilities/helper.utility';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {renderCallStatusIcon} from '../../assets/js/dropdown.data';
import UserModel from '../../services/models/User.model';
import inboxThreadModel from '../../services/models/InboxThread.model';

const EachCallItem: React.FC<{
  item: any;
  index: number;
}> = ({item}) => {
  const {type, number, date, contact, contactId, count, callDuration} = item;
  const renderName = () => {
    if (isEmpty(UserModel.getName(contact))) {
      if (!isEmpty(contact)) {
        return contact.number;
      }
      if (type === inboxThreadModel.inOutType.incoming) {
        return number;
      }
    } else {
      if (type === inboxThreadModel.inOutType.incoming) {
        return number;
      }
    }
    return 'No name found !';
  };
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.eachCall}
      onPress={() => {
        global.showBottomSheet({
          flag: true,
          component: CallBottomSheet,
          componentProps: {number, name: renderName(), id: contactId},
        });
      }}>
      <View style={styles.icon}>{(renderCallStatusIcon as any)[type]}</View>
      <View style={globalStyles.flex1}>
        <View style={styles.titleWrp}>
          <Text style={typographies.bodyMediumBold} numberOfLines={1}>
            {`${renderName()} ${count > 1 ? `(${count})` : ''}`}{' '}
          </Text>
          <Text style={typographies.bodySmallBold}>
            {timeFormat(callDuration ?? 0)}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {typeof date === 'object'
            ? formatDate(`${date}`, 'MMM DD, YYYY hh:mm A', '', true)
            : formatDate(date, 'MMM DD, YYYY hh:mm A', '', true)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default EachCallItem;

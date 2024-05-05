/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../../../packages/redux.package';
import {campaignsStates} from '../../../../../states/allSelector.state';
import {useEffect, useState} from 'react';
import {isGettingAction} from '../../../../../states/features/campaign/campaigns.slice';
import {
  customMargin,
  globalStyles,
} from '../../../../../assets/styles/global.style.asset';
import EmptyContent from '../../../../../components/core/EmptyContent.core.component';
import {typographies} from '../../../../../assets/styles/typographies.style.asset';
import {customPadding} from '../../../../../assets/styles/global.style.asset';
import HeaderSearch from '../../../../../components/app/HeaderSearch.app.component';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../../../utilities/helper.utility';
import CustomButton from '../../../../../components/core/button/CustomButton.core.component';
import {buttons} from '../../../../../assets/js/buttons.message';
import campaignApiHelper from '../../../../../services/api/helper/campaignApi.helper';
import {messages} from '../../../../../assets/js/messages.message';
const AddCampaignToContact: React.FC = ({contactId}: any) => {
  const dispatch = customUseDispatch();
  const {list, isGetting} = customUseSelector(campaignsStates);
  const [id, setId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = async () => {
    setLoading(true);
    let contactIdArr = [];
    contactIdArr.push(contactId);
    const payload = {
      campaignId: id,
      contactIds: contactIdArr,
    };
    const result = await campaignApiHelper.addContactToCampaign(payload);
    const {status, message} = result;
    if (status) {
      setLoading(false);
      global.showBottomSheet({flag: false});
      showAlertWithOneAction({
        title: messages.succAddWait,
        body: messages.wait2min,
      });
    } else {
      setLoading(false);
      global.showBottomSheet({flag: false});
      showAlertWithOneAction({title: messages.wentWrong, body: message});
    }
  };
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={selected === index ? styles.selected : styles.item}
        onPress={() => {
          setId(item.id);
          setSelected(index);
        }}>
        <Text
          style={[typographies.bodyMediumBold, globalStyles.flexShrink1]}
          numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const filter = isEmpty(list)
    ? []
    : list.filter(function (item: any) {
        return item.title.toLowerCase().match(new RegExp(search.toLowerCase()));
      });
  return (
    <View style={styles.container}>
      <HeaderSearch
        leftIcon={true}
        title="Add Campaign To Contact"
        handleChange={text => {
          setSearch(text);
        }}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={filter}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filter?.length > 0 ? {} : globalStyles.emptyFlexBox
          }
          onEndReachedThreshold={0.25}
          ListEmptyComponent={
            <EmptyContent
              forLoading={!isGetting}
              text={'No Campaigns found!'}
            />
          }
        />
        <CustomButton
          text={buttons.save}
          onPress={submit}
          disabled={isEmpty(id) || isLoading}
          isLoading={isLoading}
          style={{
            alignSelf: 'center',
            borderTopWidth: 1,
            borderTopColor: colors.gray4,
            ...customMargin(10, 20, 10, 20),
            width: '85%',
            ...(isEmpty(id) ? styles.inactiveBtn : {}),
          }}
        />
      </View>
    </View>
  );
};
export default AddCampaignToContact;
const styles = StyleSheet.create({
  container: {
    // height: 'auto',
    maxHeight: 550,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray8,
    ...customPadding(12, 20, 12, 20),
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray8,
    ...customPadding(12, 20, 12, 20),
    backgroundColor: colors.gray8,
  },
  inactiveBtn: {
    backgroundColor: colors.gray4,
  },
  listContainer: {
    justifyContent: 'space-between',
    flexShrink: 1,
    height: '100%',
  },
});

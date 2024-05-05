import {FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import Container from '../../../../../../layouts/Container.layout';
import {
  customPadding,
  globalStyles,
} from '../../../../../../assets/styles/global.style.asset';
import EmptyContent from '../../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../../assets/js/messages.message';
import SelectItem from '../component/SelectItem.contact.component';
import useLeadOwner from '../../../../hooks/useLoadOwner.hook';
import {titles} from '../../../../../../assets/js/titles.message';
import HeaderSearch from '../../../../../../components/app/HeaderSearch.app.component';

const LeadOwner: React.FC<{
  route: {
    params: {id: number; ownerId?: number};
  };
}> = ({
  route: {
    params: {id = -1, ownerId = 0},
  },
}) => {
  const {check, filter, handleSubmit, setSearch, isLoading, onRefresh, search} =
    useLeadOwner(ownerId, id);
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <SelectItem
        text={item.fullName}
        index={index}
        onPress={() => handleSubmit(item)}
        check={check === item.id}
      />
    );
  };
  const memoizedValue = renderItem;
  return (
    <Container>
      <HeaderSearch
        title={titles.leadOwner}
        values={search}
        leftIcon={true}
        handleChange={setSearch}
      />
      <FlatList
        data={filter}
        refreshing={isLoading}
        onRefresh={onRefresh}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString() + '' + check}
        contentContainerStyle={
          filter?.length > 0 ? {...customPadding(8)} : globalStyles.emptyFlexBox
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyContent text={messages.noUserFound} />
          )
        }
        initialNumToRender={12}
        renderItem={memoizedValue}
      />
    </Container>
  );
};

export default LeadOwner;

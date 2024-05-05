import {FlatList} from 'react-native';
import React from 'react';
import SelectItem from '../component/SelectItem.contact.component';
import Container from '../../../../../../layouts/Container.layout';
import {
  customPadding,
  globalStyles,
} from '../../../../../../assets/styles/global.style.asset';
import EmptyContent from '../../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../../assets/js/messages.message';
import useLeadSource from '../../../../hooks/useLoadSource.hook';
import {titles} from '../../../../../../assets/js/titles.message';
import HeaderSearch from '../../../../../../components/app/HeaderSearch.app.component';

const LeadSource: React.FC<{
  route: {
    params: {id: number | string; sourceId?: number};
  };
}> = ({
  route: {
    params: {id = '', sourceId = 0},
  },
}) => {
  const {check, filter, handleSubmit, setSearch, isLoading, onRefresh, search} =
    useLeadSource(sourceId, id);
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <SelectItem
        text={item.sourceTitle}
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
        title={titles.leadSource}
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
          filter?.length > 0 ? {...customPadding(8)} : globalStyles.centerView
        }
        ListEmptyComponent={
          <EmptyContent text={messages.noSourceFound} forLoading={isLoading} />
        }
        initialNumToRender={12}
        renderItem={memoizedValue}
      />
    </Container>
  );
};

export default LeadSource;

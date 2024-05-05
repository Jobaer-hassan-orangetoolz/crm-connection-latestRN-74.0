import React from 'react';
import Container from '../../../layouts/Container.layout';
import {colors} from '../../../assets/styles/colors.style.asset';
import ContactList from './ContactList.module';
import useContactsList from '../hooks/useContactsList.hook';
import {titles} from '../../../assets/js/titles.message';
import HeaderSearch from '../../../components/app/HeaderSearch.app.component';
const ContactsIndex: React.FC = () => {
  const {
    list,
    refreshing,
    search,
    handleDebounce,
    isLoading,
    loadMore,
    onRefresh,
    hasMore,
  } = useContactsList();
  return (
    <Container bg={colors.white}>
      <HeaderSearch
        title={titles.contacts}
        values={search}
        leftIcon={false}
        handleChange={handleDebounce}
      />
      <ContactList
        isLoading={isLoading}
        list={list}
        hasMore={hasMore}
        loadMore={loadMore}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </Container>
  );
};

export default ContactsIndex;

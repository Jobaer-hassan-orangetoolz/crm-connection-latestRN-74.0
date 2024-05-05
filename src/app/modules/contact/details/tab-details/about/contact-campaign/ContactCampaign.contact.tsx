/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import Container from '../../../../../../layouts/Container.layout';
import {colors} from '../../../../../../assets/styles/colors.style.asset';
import {titles} from '../../../../../../assets/js/titles.message';
import {
  customPadding,
  globalStyles,
} from '../../../../../../assets/styles/global.style.asset';
import EmptyContent from '../../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../../assets/js/messages.message';
import CampaignItem from '../../../../../../components/app/CampaignItem.app.component';
import {
  contactCampaignFormatter,
  contactCampaignInterface,
} from '../../../../../../services/formatter/campaign.formatter';
import rs from '../../../../../../assets/styles/responsiveSize.style.asset';
import {isEmpty} from '../../../../../../utilities/helper.utility';
import HeaderSearch from '../../../../../../components/app/HeaderSearch.app.component';
import AddIcon from '../../../../../../assets/icons/Add.icon.asset';
import AddCampaignToContact from '../../add-contact/AddCampaignToContact.module';

const ContactCampaign: React.FC<{
  route: {params: {id: number; campaigns: any[]}};
  navigation: any;
}> = ({
  route: {
    params: {id = 0, campaigns = []},
  },
}) => {
  const [search, setSearch] = useState<string>('');
  const renderItem = ({
    item,
    index,
  }: {
    item: contactCampaignInterface;
    index: number;
  }) => {
    return (
      <CampaignItem
        index={index}
        id={id}
        item={contactCampaignFormatter(item)}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, []);
  const filter = isEmpty(campaigns)
    ? []
    : campaigns.filter(function (item: any) {
        return item.campaignTitle
          .toLowerCase()
          .match(new RegExp(search.toLowerCase()));
      });
  const handleAddContactToCampaign = () => {
    return global.showBottomSheet({
      flag: true,
      component: AddCampaignToContact,
      componentProps: {contactId: id},
    });
  };
  return (
    <Container bg={colors.white} containerStyle={styles.container}>
      <HeaderSearch
        title={titles.campaign}
        values={search}
        handleChange={setSearch}
      />
      <FlatList
        data={filter}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={
          filter?.length > 0
            ? {...customPadding(8), gap: rs(2)}
            : globalStyles.emptyFlexBox
        }
        ListEmptyComponent={<EmptyContent text={messages.noDataFound} />}
        initialNumToRender={12}
        renderItem={memoizedValue}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => {
          handleAddContactToCampaign();
        }}>
        <AddIcon />
      </TouchableOpacity>
    </Container>
  );
};

export default ContactCampaign;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    bottom: 15,
    right: 16,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
  },
});

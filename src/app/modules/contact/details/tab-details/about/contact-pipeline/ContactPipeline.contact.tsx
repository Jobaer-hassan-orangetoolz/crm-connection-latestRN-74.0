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
import {isEmpty} from '../../../../../../utilities/helper.utility';
import rs from '../../../../../../assets/styles/responsiveSize.style.asset';
import EmptyContent from '../../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../../assets/js/messages.message';
import ContactPipelineItem from '../../../component/ContactPipeline.component';
import {
  contactPipelineFormatter,
  contactPipelineItem,
} from '../../../../../../services/formatter/contactPipeline.formatter';
import HeaderSearch from '../../../../../../components/app/HeaderSearch.app.component';
import AddIcon from '../../../../../../assets/icons/Add.icon.asset';
import {useCustomNavigation} from '../../../../../../packages/navigation.package';
import {screens} from '../../../../../../routes/routeName.route';
import {customUseSelector} from '../../../../../../packages/redux.package';
import {aboutContactStates} from '../../../../../../states/allSelector.state';

const ContactPipeline: React.FC<{
  route: {params: {id: any; contactDetails: any}};
  navigation: any;
}> = ({
  route: {
    params: {id = '', contactDetails = {}},
  },
}) => {
  const [search, setSearch] = useState<string>('');
  const navigation = useCustomNavigation<any>();
  const {pipeline} = customUseSelector(aboutContactStates);
  const [isAtBottom, setIsAtBottom] = useState<any>(true);
  const renderItem = ({
    item,
    index,
  }: {
    item: contactPipelineItem;
    index: number;
  }) => {
    return (
      <ContactPipelineItem
        index={index}
        item={contactPipelineFormatter(item)}
        id={id}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, []);
  const filter = isEmpty(pipeline)
    ? []
    : pipeline.filter(function (item: any) {
        return item?.title
          ?.toLowerCase()
          .match(new RegExp(search.toLowerCase()));
      });
  const handleAddContactToPipeline = () => {
    navigation.navigate(screens.addDeal, {
      contactId: id,
      contactDetails: contactDetails,
    });
  };
  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y <= contentSize.height - 10;
    setIsAtBottom(isCloseToBottom);
  };
  return (
    <Container bg={colors.white} containerStyle={styles.container}>
      <HeaderSearch
        title={titles.pipeline}
        values={search}
        leftIcon={true}
        handleChange={setSearch}
      />
      <FlatList
        data={filter}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        contentContainerStyle={
          filter?.length > 0
            ? {...customPadding(8), gap: rs(2)}
            : globalStyles.emptyFlexBox
        }
        ListEmptyComponent={<EmptyContent text={messages.noDataFound} />}
        initialNumToRender={12}
        renderItem={memoizedValue}
      />
      {isAtBottom && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            handleAddContactToPipeline();
          }}>
          <AddIcon />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default ContactPipeline;
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

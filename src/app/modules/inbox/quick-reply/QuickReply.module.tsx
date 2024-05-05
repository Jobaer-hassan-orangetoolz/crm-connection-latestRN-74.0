import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text} from 'react-native';
import HeaderSearchInput from '../../../components/core/input/HeaderSearchInput.core.component';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../assets/js/titles.message';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import useQuickReply from '../hooks/useQuickReply.hook';
import Container from '../../../layouts/Container.layout';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import QuickReplyItem, {
  QuickReplyItemType,
} from '../../../components/app/QuickReplyItem.app.component';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {htmlEntityReplace} from '../../../utilities/helper.utility';
const QuickReply: React.FC = ({
  route: {
    params: {handleSuccessReply},
  },
}: any) => {
  const {
    showSearch,
    setSearchText,
    setShowSearch,
    filter,
    refreshing,
    onRefresh,
    navigation,
    isLoading,
  } = useQuickReply();
  const _render = ({
    item,
    index,
  }: {
    item: QuickReplyItemType;
    index: number;
  }) => {
    return (
      <QuickReplyItem
        item={item}
        onPress={() => {
          navigation.goBack();
          handleSuccessReply(htmlEntityReplace(item.message));
        }}
        index={index}
      />
    );
  };
  return (
    <Container containerStyle={styles.container}>
      {showSearch ? (
        <HeaderSearchInput
          onChange={text => setSearchText(text)}
          cancelHandler={() => setShowSearch(false)}
        />
      ) : (
        <RightLeftActionHeader
          title={titles.quickReply}
          rightHandlerDisable={false}
          rightHandler={() => setShowSearch(true)}
          isAnimating={false}
          leftIcon={<LeftArrowIcon height={28} width={28} />}
        />
      )}
      <Text style={styles.totalText}>{`Total ${filter.length} replies`}</Text>
      <FlatList
        data={filter}
        renderItem={_render}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          isLoading ? (
            <EmptyContent forLoading={true} />
          ) : (
            <EmptyContent text={'List is Empty'} />
          )
        }
      />
    </Container>
  );
};
export default QuickReply;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalText: {
    ...typographies.bodyXS,
    color: colors.gray4,
    ...customPadding(12, 20, 12, 20),
    marginTop: 4,
  },
});

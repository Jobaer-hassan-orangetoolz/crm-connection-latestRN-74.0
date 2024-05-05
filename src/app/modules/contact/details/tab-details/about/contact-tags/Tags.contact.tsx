import {ActivityIndicator, FlatList, View} from 'react-native';
import React from 'react';
import Container from '../../../../../../layouts/Container.layout';
import {colors} from '../../../../../../assets/styles/colors.style.asset';
import {titles} from '../../../../../../assets/js/titles.message';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../../../../../assets/styles/global.style.asset';
import InputWithIcon from '../../../../../../components/core/input/InputWithIcon.core.component';
import SearchIcon from '../../../../../../assets/icons/Search.icon.asset';
import CrossIcon from '../../../../../../assets/icons/Cross.icon.asset';
import {placeholders} from '../../../../../../assets/js/placeholders.message';
import RightLeftActionHeader from '../../../../../../components/core/headers/RightLeftActionHeader.core.component';
import {buttons} from '../../../../../../assets/js/buttons.message';
import LeftArrowIcon from '../../../../../../assets/icons/LeftArrow.icon.asset';
import useUserTags from '../../../../../splash/hooks/useUserTags.hook';
import EmptyContent from '../../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../../assets/js/messages.message';
import Badge from '../../../../../../components/app/Badge.app.component';
import {contactTagsStyles} from '../../../../styles/contactTags.styles';
import CustomButton from '../../../../../../components/core/button/CustomButton.core.component';
import {typographies} from '../../../../../../assets/styles/typographies.style.asset';

const ContactTags: React.FC<{
  route: {params: {id: number; tags: any[]}};
}> = ({
  route: {
    params: {id = -1, tags = []},
  },
}) => {
  const {
    clearSearch,
    handleDebounce,
    list,
    isLoading,
    loadMore,
    onRefresh,
    refreshing,
    search,
    userTags = [],
    handleSubmit,
    handleClick,
  } = useUserTags(tags, id);
  const renderItem = ({item}: {item: any; index: number}) => {
    return (
      <Badge
        text={item.name}
        onPress={() => handleClick(item)}
        check={userTags.some((value: any) => value.tag_id === item.id)}
        classes="secondary"
        textStyle={[typographies.labelLarge, {color: colors.gray4}]}
      />
    );
  };
  return (
    <Container bg={colors.white}>
      <RightLeftActionHeader
        title={titles.tags}
        leftIcon={<LeftArrowIcon />}
        right={buttons.save}
        rightHandlerDisable={false}
        rightHandler={handleSubmit}
        isAnimating={false}
      />
      <View style={{...customPadding(8, 20, 8, 20)}}>
        <InputWithIcon
          defaultValue={search}
          leftIcon={<SearchIcon />}
          rightIcon={search && <CrossIcon />}
          placeholder={placeholders.search}
          rightHandler={clearSearch}
          onChangeText={handleDebounce}
        />
      </View>
      <FlatList
        data={list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString() + ''}
        contentContainerStyle={
          list?.length > 0
            ? contactTagsStyles.container
            : globalStyles.emptyFlexBox
        }
        numColumns={3}
        columnWrapperStyle={contactTagsStyles.gap_8}
        style={{...customPadding(0, 20, 20, 20)}}
        ListEmptyComponent={
          isLoading ? (
            <View style={globalStyles.activityCenter}>
              <ActivityIndicator />
            </View>
          ) : (
            <EmptyContent text={messages.noUserFound} />
          )
        }
        initialNumToRender={12}
        renderItem={renderItem}
      />
      <CustomButton
        text={buttons.loadMore}
        onPress={loadMore}
        style={{...customMargin(0, 20, 20, 20)}}
      />
    </Container>
  );
};

export default ContactTags;

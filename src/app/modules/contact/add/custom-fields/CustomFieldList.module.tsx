import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {customFieldListStyles as styles} from '../styles/customfield.style';
import Container from '../../../../layouts/Container.layout';
import RightLeftActionHeader from '../../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../../assets/js/titles.message';
import HeaderSearchInput from '../../../../components/core/input/HeaderSearchInput.core.component';
import LeftArrowIcon from '../../../../assets/icons/LeftArrow.icon.asset';
import EachCustomField from './EachCustomField.module';
import {globalStyles} from '../../../../assets/styles/global.style.asset';
import Loading from '../../../../assets/lottie/Loading.lottie.asset';
import EmptyContent from '../../../../components/core/EmptyContent.core.component';
import {placeholders} from '../../../../assets/js/placeholders.message';
import {colors} from '../../../../assets/styles/colors.style.asset';
import useCustomFieldList from '../hooks/useCustomFieldList.hook';
import {isEmpty} from '../../../../utilities/helper.utility';

const CustomFieldList: React.FC<any> = ({navigation, route: {params}}) => {
  const {onSelect, selected} = params;
  const {userCustomField, isLoading, isShowSearch, showSearch} =
    useCustomFieldList();
  const _renderItem = ({item, index}: any) => {
    // if (
    //   selected.includes(item.personalizeTag) ||
    //   isEmpty(item.personalizeTag)
    // ) {
    //   return null;
    // }
    return (
      <EachCustomField
        index={index}
        item={item}
        onSelect={() => {
          onSelect(item, index);
          navigation.goBack();
        }}
      />
    );
  };
  const _data: any = userCustomField.filter(
    (__item: any) =>
      !selected.includes(__item.personalizeTag) &&
      !isEmpty(__item.personalizeTag),
  );
  return (
    <Container>
      {showSearch ? (
        <HeaderSearchInput
          onChange={() => {}}
          cancelHandler={() => isShowSearch(false)}
        />
      ) : (
        <RightLeftActionHeader
          title={titles.selectCustomField}
          rightHandlerDisable={false}
          rightHandler={() => isShowSearch(true)}
          isAnimating={false}
          leftIcon={<LeftArrowIcon height={28} width={28} />}
        />
      )}
      <View style={styles.container}>
        <Text style={styles.title}>
          {titles._totalCustomField.replace(
            '__replacing__',
            userCustomField.length.toString(),
          )}
        </Text>
        <View style={globalStyles.flex1}>
          <FlatList
            data={_data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={_renderItem}
            ListEmptyComponent={
              isLoading ? (
                <Loading styles={styles.lottie} color={colors.primary} />
              ) : (
                <EmptyContent text={placeholders.noCustomFields} />
              )
            }
            contentContainerStyle={
              isLoading || _data.length === 0
                ? globalStyles.emptyFlexBox
                : globalStyles.gap2
            }
            refreshing={isLoading}
            // onRefresh={() => setIsLoading(true)}
          />
        </View>
      </View>
    </Container>
  );
};
export default CustomFieldList;

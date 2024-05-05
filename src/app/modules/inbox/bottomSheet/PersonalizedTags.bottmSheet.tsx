/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderSearchInput from '../../../components/core/input/HeaderSearchInput.core.component';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {titles} from '../../../assets/js/titles.message';
import EachPersonalizeItem from '../details/EachPersonalizeItem';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import usePersonalisedTags from '../hooks/usePersonalisedTags.hook';
const PersonalizedTags: React.FC<any> = ({
  handlePress = () => {},
  name = 'none',
}: any) => {
  const {showSearch, setSearchText, setShowSearch, filter} =
    usePersonalisedTags();
  const _render = ({item, index}: any) => {
    if (item?.group && item.group) {
      return <Text style={styles.groupText}>{item.title}</Text>;
    } else {
      return (
        <EachPersonalizeItem
          item={item}
          onPress={(value: any) => {
            handlePress(value, name);
            global.showBottomSheet({flag: false});
          }}
          key={index}
        />
      );
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled={true}>
      <View style={styles.container}>
        {showSearch ? (
          <HeaderSearchInput
            onChange={text => setSearchText(text)}
            cancelHandler={() => setShowSearch(false)}
          />
        ) : (
          <RightLeftActionHeader
            title={titles.personalize}
            rightHandlerDisable={false}
            rightHandler={() => setShowSearch(true)}
            isAnimating={false}
            leftIconHandler={() => {
              global.showBottomSheet({flag: false});
            }}
            leftIcon={<LeftArrowIcon height={28} width={28} />}
          />
        )}
        <FlatList
          data={filter}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{paddingBottom: 70}}
          renderItem={_render}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, _index) => _index.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default PersonalizedTags;
const styles = StyleSheet.create({
  container: {flexShrink: 1},
  groupText: {
    ...typographies.bodyLargeBold,
    paddingHorizontal: 20,
  },
});

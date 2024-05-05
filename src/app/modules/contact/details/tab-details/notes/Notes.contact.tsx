import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import NoteItem from './components/NoteItem.contact';
import {
  customPadding,
  globalStyles,
} from '../../../../../assets/styles/global.style.asset';
import useContactNote from '../../../hooks/useContactNote.hook';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import {noteFormatter} from '../../../../../services/formatter/note.formatter';
import {messages} from '../../../../../assets/js/messages.message';
import EmptyContent from '../../../../../components/core/EmptyContent.core.component';
import {config} from '../../../../../../config';
import {useCustomNavigation} from '../../../../../packages/navigation.package';
import {screens} from '../../../../../routes/routeName.route';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import {typographies} from '../../../../../assets/styles/typographies.style.asset';
import {buttons} from '../../../../../assets/js/buttons.message';
const ContactNotes: React.FC<{id: string}> = ({id = ''}) => {
  const {list, loadMore, isLoading} = useContactNote(id);
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <NoteItem item={noteFormatter(item)} index={index} />;
  };
  const memoizedValue = useMemo(() => renderItem, []);
  const navigation = useCustomNavigation<any>();
  return (
    <View style={globalStyles.emptyFlexBox}>
      {config.extraFeature && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.addNote as never, {
              id: id,
              contact: true,
            });
          }}
          style={styles.extraBtn}>
          <Text style={[typographies.bodyMediumBold, {color: colors.white}]}>
            {buttons.addNew}
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={list}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={
          isLoading || list?.length === 0
            ? globalStyles.activityCenter
            : {...customPadding(20, 20, 20, 20), gap: rs(12)}
        }
        initialNumToRender={5}
        renderItem={memoizedValue}
        onEndReachedThreshold={1}
        ListEmptyComponent={
          !config.extraFeature && (
            <EmptyContent forLoading={isLoading} text={messages.noNotesFound} />
          )
        }
        onEndReached={loadMore}
      />
    </View>
  );
};

export default ContactNotes;

const styles = StyleSheet.create({
  extraBtn: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    height: 32,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 20,
  },
});

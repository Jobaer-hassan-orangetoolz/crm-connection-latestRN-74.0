/* eslint-disable react-native/no-inline-styles */
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import TaskItem from '../../../../task/components/TaskItem.component';
import useContactTask from '../../../hooks/useContactTask.hook';
import {
  customPadding,
  globalStyles,
} from '../../../../../assets/styles/global.style.asset';
import Badge from '../../../../../components/app/Badge.app.component';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
import {contactTaskTabOptions} from '../../../../../assets/js/dropdown.data';
import {taskFormatter} from '../../../../../services/formatter/task.formatter';
import EmptyContent from '../../../../../components/core/EmptyContent.core.component';
import {messages} from '../../../../../assets/js/messages.message';
import {contactInterface} from '../../../../../services/formatter/contact.formatter';
import {contactTagsStyles as styles} from '../../../styles/contactTags.styles';
import CustomButton from '../../../../../components/core/button/CustomButton.core.component';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import {typographies} from '../../../../../assets/styles/typographies.style.asset';
import {config} from '../../../../../../config';
import {screens} from '../../../../../routes/routeName.route';

const ContactTasks: React.FC<{id: number; item?: contactInterface}> = ({
  id = -1,
  item: __item,
}) => {
  const {list, loadMore, isLoading, tab, handleTab, navigation, data} =
    useContactTask(id);
  const renderItem = ({item: _item, index}: {item: any; index: number}) => {
    return (
      <TaskItem
        item={taskFormatter(_item)}
        index={index}
        bottomSheet={true}
        contactId={id}
        contactInfo={__item}
        contact={true}
      />
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(() => renderItem, []);
  return (
    <View style={styles.taskContainer}>
      <View
        style={{
          flexDirection: `${'row'}`,
          gap: rs(8),
          ...customPadding(16, 20, 16, 20),
        }}>
        <View style={{flex: 1, flexDirection: `${'row'}`, gap: rs(8)}}>
          {contactTaskTabOptions.map((value, optionsIndex) => {
            return (
              <Badge
                text={value.name}
                onPress={() => handleTab(value.value)}
                key={optionsIndex}
                classes={tab === value.value ? 'primary' : 'secondary'}
              />
            );
          })}
        </View>
        {config.extraFeature && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.addTask as any, {
                contactInfo: data,
                contact: true,
              });
            }}
            style={{
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={[typographies.bodyMediumBold, {color: colors.white}]}>
              + Add New
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={list}
        scrollEnabled={false}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString() + item?.task_status}
        contentContainerStyle={
          isLoading || list?.length === 0
            ? globalStyles.activityCenter
            : {gap: rs(12)}
        }
        initialNumToRender={5}
        renderItem={memoizedValue}
        ListEmptyComponent={
          !config.extraFeature && (
            <EmptyContent forLoading={isLoading} text={messages.noTaskFound} />
          )
        }
        onEndReachedThreshold={1}
        onEndReached={loadMore}
      />
    </View>
  );
};

export default ContactTasks;

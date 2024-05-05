import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import Container from '../../layouts/Container.layout';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {titles} from '../../assets/js/titles.message';
import TaskTab from './components/TaskTab.task';
import useTasksList from './hooks/useTasksList.hook';
import TaskItem from './components/TaskItem.component';
import {colors} from '../../assets/styles/colors.style.asset';
import EmptyContent from '../../components/core/EmptyContent.core.component';
import {messages} from '../../assets/js/messages.message';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {
  taskFormatter,
  taskInterfaceItem,
} from '../../services/formatter/task.formatter';
import {config} from '../../../config';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';
import {taskStyle} from './style/task.style';
import {buttons} from '../../assets/js/buttons.message';
const TaskIndex: React.FC = () => {
  const {
    list,
    isLoading,
    tab,
    updateTab,
    hasMore,
    refreshing,
    onRefresh,
    loadMore,
  } = useTasksList();
  const renderItem = ({
    item,
    index,
  }: {
    item: taskInterfaceItem;
    index: number;
  }) => {
    return <TaskItem item={taskFormatter(item)} index={index} />;
  };
  const memoizedValue = useMemo(() => renderItem, []);
  const navigation = useCustomNavigation<any>();
  return (
    <Container showHeader={true}>
      <FlatList
        data={list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View style={{backgroundColor: colors.white}}>
            <View style={taskStyle.headerContainer}>
              <Text style={typographies.headingLarge}>{titles.tasks}</Text>
              {config.extraFeature && (
                <View style={taskStyle.addNewBtnContainer}>
                  <TouchableOpacity
                    style={taskStyle.goBackBtn}
                    onPress={() => {
                      navigation?.goBack()
                        ? navigation.goBack()
                        : navigation.navigate(screens.dashboard);
                    }}>
                    <Text
                      style={[
                        typographies.bodyMediumBold,
                        {color: colors.primary},
                      ]}>
                      {buttons.goBack}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(screens.addTask as any);
                    }}
                    style={taskStyle.mainBtn}>
                    <Text
                      style={[
                        typographies.bodyMediumBold,
                        {color: colors.white},
                      ]}>
                      {buttons.addNew}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TaskTab updateTab={updateTab} tab={tab} />
          </View>
        }
        contentContainerStyle={
          list?.length > 0 ? {} : globalStyles.emptyFlexBox
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={5}
        ListEmptyComponent={
          <EmptyContent text={messages.noTaskFound} forLoading={isLoading} />
        }
        renderItem={memoizedValue}
        ListFooterComponent={
          hasMore && (
            <View style={[{height: rs(40)}, globalStyles.activityCenter]}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )
        }
        onEndReachedThreshold={0.25}
        onEndReached={loadMore}
      />
    </Container>
  );
};

export default TaskIndex;

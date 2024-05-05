/* eslint-disable react-native/no-inline-styles */
import React = require('react');
import {Text, View} from 'react-native';
import {dashboardStyles as styles} from './dahsboardStyles.style';
import {typographies} from '../../assets/styles/typographies.style.asset';
import Badge from '../../components/app/Badge.app.component';
import CustomDropdown from '../../components/core/CustomDropdown.core.component';
import {colors} from '../../assets/styles/colors.style.asset';
import DealAnimatedCircle from '../../components/app/DealAnimatedCircle';
import {globalStyles} from '../../assets/styles/global.style.asset';
import SelectScheduleBottomSheet from './bottomSheet/SelectSchedule.bottomSheet';
import {tabTitles, titles} from '../../assets/js/titles.message';
import DashboardSkeleton from '../../components/skeletons/DashboardSkeleton.skeleton';
import ConversationRateAnimatedCircle from '../../components/app/ConversationRateAnimatedCircle';
import {config} from '../../../config';
import CustomButton from '../../components/core/button/CustomButton.core.component';
import {buttons} from '../../assets/js/buttons.message';
import {useCustomNavigation} from '../../packages/navigation.package';
import {screens} from '../../routes/routeName.route';
import TaskItem from '../task/components/TaskItem.component';
import {taskFormatter} from '../../services/formatter/task.formatter';
import EmptyContent from '../../components/core/EmptyContent.core.component';
import InboxIcon from '../../assets/icons/Inbox.icon.asset';
import CustomSwitch from '../../components/core/CustomSwitch.core.component';

const PipelineHeader: React.FC<{tab: number; tabChange: Function}> = ({
  tab,
  tabChange,
}) => {
  return (
    <View style={styles.cardHeaderRight}>
      <Badge
        text="Value"
        onPress={() => tabChange(0)}
        classes={tab === 0 ? 'primary' : 'secondary'}
      />
      <Badge
        text="Count"
        onPress={() => tabChange(1)}
        classes={tab === 1 ? 'primary' : 'secondary'}
      />
    </View>
  );
};
const TaskHeader: React.FC<{count: any}> = ({count}) => {
  const totalValue = Object.keys(count).reduce(
    (acc, value) => acc + count[value],
    0,
  );
  return (
    <View style={styles.cardHeaderRightAlt}>
      <Text style={styles.cardHeaderAltText}>{titles.totalTasks}</Text>
      <Text style={typographies.headingLarge}>{totalValue}</Text>
    </View>
  );
};

const PipelineFooter: React.FC<{count: any; tab: number}> = ({
  count = {},
  tab = 0,
}) => {
  return [
    {color: '#316AFF', title: 'Open', value: count.opened || 0},
    {color: '#00ff91', title: 'Won', value: count.win || 0},
    {color: '#E60945', title: 'Lost', value: count.lost || 0},
  ].map((item: any, index: any) => (
    <View style={globalStyles.gap2} key={index}>
      <View style={[globalStyles.flexRow, globalStyles.gap8]}>
        <View style={[globalStyles.dot14, {backgroundColor: item.color}]} />
        <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
          {item.title}
        </Text>
      </View>
      <Text style={typographies.bodyMediumBold}>
        {tab === 0 ? '$ ' : ''}
        {item.value}
      </Text>
    </View>
  ));
};
const TaskFooter: React.FC<{count: any}> = ({count = {}}) => {
  return [
    {color: '#316AFF', title: 'Complete:', value: count.win || 0},
    {color: '#00ff91', title: 'Due:', value: count.lost || 0},
    {color: '#E60945', title: 'Pending:', value: count.opened || 0},
  ].map((item: any, index: any) => (
    <View style={globalStyles.gap4} key={index}>
      <View style={[globalStyles.flexRow, globalStyles.gap8]}>
        <View style={[globalStyles.dot14, {backgroundColor: item.color}]} />
        <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
          {item.title}
        </Text>
        <Text style={typographies.bodyMediumBold}>{item.value}</Text>
      </View>
    </View>
  ));
};

const CardView: React.FC<{
  cardType?:
    | 'pipeline'
    | 'task'
    | 'conversation-rate'
    | 'today-activities'
    | 'unread-message';
  data: any;
}> = ({cardType = 'pipeline', data = {}}) => {
  const {
    tab,
    filter,
    count,
    filterChange,
    tabChange,
    loading,
    taskList,
    badgeValue = 0,
    check = false,
    toggleUser = () => {},
  } = data;
  const navigation = useCustomNavigation<any>();
  return loading ? (
    <DashboardSkeleton />
  ) : (
    <View style={styles.cardWrp}>
      <View
        style={
          config.extraFeature &&
          cardType === 'pipeline' && {
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        }>
        <Text style={typographies.bodyMediumBold}>
          {cardType === 'conversation-rate'
            ? titles.conversationRate
            : cardType === 'pipeline'
            ? titles.salesActivity
            : cardType === 'today-activities'
            ? titles.todaysActivities
            : cardType === 'unread-message'
            ? titles.unreadMsg
            : titles.taskReport}
        </Text>
        {config.extraFeature && cardType === 'pipeline' && (
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={typographies.bodySmallBold}>User</Text>
            <CustomSwitch
              onPress={toggleUser}
              value={check}
              activeColor={colors.primary}
            />
            <Text style={typographies.bodySmallBold}>Team</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.cardBody,
          {
            padding: cardType === 'today-activities' ? 0 : 12,
            paddingBottom: 12,
          },
        ]}>
        {cardType !== 'today-activities' && cardType !== 'unread-message' && (
          <View style={styles.cardHeader}>
            {cardType !== 'conversation-rate' && (
              <>
                {cardType === 'task' ? (
                  <TaskHeader count={count} />
                ) : (
                  <PipelineHeader tab={tab} tabChange={tabChange} />
                )}
              </>
            )}
            {cardType === 'conversation-rate' && <View />}

            <View>
              <CustomDropdown
                text={filter?.title}
                iconFill={colors.primary}
                iconSize={20}
                component={SelectScheduleBottomSheet}
                componentProps={{filter, filterChange}}
                containerStyles={cardType === 'task' ? styles.dropdownAlt : {}}
              />
            </View>
          </View>
        )}
        <View style={(styles as any)[cardType + 'Body']}>
          {cardType === 'pipeline' && (
            <DealAnimatedCircle data={count} size={200} tab={tab} />
          )}
          {/* {cardType === 'task' && <TaskGraph data={count} />} */}
          {cardType === 'conversation-rate' && (
            <ConversationRateAnimatedCircle data={count} size={180} />
          )}
        </View>
        {cardType !== 'conversation-rate' &&
          cardType !== 'today-activities' &&
          cardType !== 'unread-message' && (
            <View style={(styles as any)[cardType + 'Footer']}>
              {cardType === 'pipeline' ? (
                <PipelineFooter count={count} tab={tab} />
              ) : (
                <TaskFooter count={count} />
              )}
            </View>
          )}

        {config.extraFeature && cardType === 'today-activities' && (
          <View>
            {taskList.length > 0 ? (
              taskList.slice(0, 3).map((item: any, index: number) => {
                return (
                  <TaskItem
                    item={taskFormatter(item)}
                    index={index}
                    key={index}
                    disabled={true}
                    from="dashboard"
                  />
                );
              })
            ) : (
              <EmptyContent
                text={"Today's task is Empty"}
                textStyle={{fontSize: 19}}
              />
            )}
          </View>
        )}
        {config.extraFeature && cardType === 'unread-message' && (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <InboxIcon height={25} width={25} fill="#000" />
              <Text
                numberOfLines={2}
                style={[
                  typographies.bodyMediumBold,
                  {textAlign: 'center', flexShrink: 1},
                ]}>{`${badgeValue} Unread messages`}</Text>
            </View>
            <CustomButton
              text="Go to inbox"
              onPress={() => {
                navigation.navigate(screens.inbox);
              }}
              style={{width: 20, alignSelf: 'center', justifyContent: 'center'}}
            />
          </View>
        )}
        {config.extraFeature &&
          (cardType === 'pipeline' || cardType === 'today-activities') && (
            <CustomButton
              text={
                cardType === 'pipeline'
                  ? buttons.viewDeal
                  : buttons.viewAllActivities
              }
              style={styles.dealBtn}
              onPress={() => {
                let screen = '';
                if (cardType === 'pipeline') {
                  screen = screens.stage;
                } else if (cardType === 'today-activities') {
                  screen = screens.task;
                }
                navigation.navigate(screen);
              }}
            />
          )}
      </View>
    </View>
  );
};
export default CardView;

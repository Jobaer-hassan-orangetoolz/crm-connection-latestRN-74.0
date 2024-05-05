import React from 'react';
import Container from '../../layouts/Container.layout';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {dashboardStyles as styles} from './dahsboardStyles.style';
import {titles} from '../../assets/js/titles.message';
import {typographies} from '../../assets/styles/typographies.style.asset';
import CardView from './CardView.module';
import useDashboard from './hook/useDashboard.hook';
import {config} from '../../../config';

const Dashboard: React.FC = () => {
  const {
    activityData,
    activityFilter,
    activityLoading,
    activityRefreshing,
    onRefresh,
    tab,
    handleActivityFilter,
    handleChangeTab,
    activityCount,
    activityCountLoading,
    activityCountFilter,
    handleCountFilter,
    taskData,
    unreadCount,
    check,
    toggleUser,
  } = useDashboard();
  return (
    <Container>
      <View style={styles.headerContainer}>
        <Text style={typographies.headingLarge}>{titles.dashboard}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={activityRefreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.bodyContainer}>
          <CardView
            data={{
              tab,
              filter: activityFilter,
              //   count: (activityData as any)[tab === 1 ? 'count' : 'value'],
              count: activityData,
              filterChange: handleActivityFilter,
              tabChange: handleChangeTab,
              loading: activityLoading,
              check: check,
              toggleUser: toggleUser,
            }}
          />
          {config.extraFeature && (
            <>
              <CardView
                data={{
                  taskList: taskData,
                }}
                cardType={'today-activities'}
              />
              <CardView
                data={{
                  badgeValue: unreadCount,
                }}
                cardType={'unread-message'}
              />
            </>
          )}
          <CardView
            data={{
              filter: activityCountFilter,
              count: activityCount,
              filterChange: handleCountFilter,
              loading: activityCountLoading,
            }}
            cardType={'conversation-rate'}
          />
        </View>
      </ScrollView>
    </Container>
  );
};
export default Dashboard;

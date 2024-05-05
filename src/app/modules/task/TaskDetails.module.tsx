import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../layouts/Container.layout';
import {
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import useTaskDetails from './hooks/useTaskDetails.hook';
import IconWithTextHeader from '../../components/core/headers/IconWithTextHeader.app.component';
import EditIcon from '../../assets/icons/Edit.icon.asset';
import DeleteIcon from '../../assets/icons/Delete.icon.asset';
import TaskDetailsComponent from './components/TaskDetails.component';
import {taskItemStyles} from './style/taskItem.style';
import {isEmpty} from '../../utilities/helper.utility';
import {taskInterface} from '../../services/formatter/task.formatter';
type Route = {
  params: {
    item?: taskInterface | undefined | any;
    index?: number;
  };
};
const TaskDetails: React.FC<{route: Route}> = ({
  route: {params: {item = null, index = -1} = {}} = {},
}) => {
  const {data, isLoading, handleDelete, handleEdit} = useTaskDetails(
    item,
    index,
  );
  const styles = taskItemStyles;
  return (
    <Container bg={colors.white}>
      <IconWithTextHeader
        rightComponent={
          <View style={styles.taskHeader}>
            <TouchableOpacity activeOpacity={0.5} onPress={handleEdit}>
              <EditIcon width={28} height={28} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
              <DeleteIcon fill={colors.error1} width={28} height={28} />
            </TouchableOpacity>
          </View>
        }
      />
      {isLoading ? (
        <View style={globalStyles.activityCenter}>
          <ActivityIndicator color={colors.primary} size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={{...customPadding(12, 20, 20, 20)}}
          contentContainerStyle={globalStyles.flex1}>
          {!isEmpty(data) && <TaskDetailsComponent data={data} index={index} />}
        </ScrollView>
      )}
    </Container>
  );
};

export default TaskDetails;

import {View, Text, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';
import {taskItemStyles} from '../style/taskItem.style';
import {typographies} from '../../../assets/styles/typographies.style.asset';
interface taskIconWithText {
  icon: ReactElement;
  text: string | undefined;
  style?: ViewStyle;
}
const TaskIconWithText: React.FC<taskIconWithText> = ({
  icon = <></>,
  text = '',
  style = {},
}) => {
  const styles = taskItemStyles;
  return (
    <View style={[styles.taskIconCont, style]}>
      {icon}
      <Text style={typographies.bodySmall}>{text}</Text>
    </View>
  );
};

export default TaskIconWithText;

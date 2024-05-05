import React from 'react';
import {screens} from './routeName.route';
import TaskDetails from '../modules/task/TaskDetails.module';
import AddTask from '../modules/task/add/AddTask.module';

const taskRoutes = Stack => {
  return [
    <Stack.Screen name={screens.taskDetails} component={TaskDetails} key={0} />,
    <Stack.Screen name={screens.addTask} component={AddTask} key={1} />,
  ];
};

export default taskRoutes;

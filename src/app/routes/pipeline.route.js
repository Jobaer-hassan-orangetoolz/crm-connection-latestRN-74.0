import React from 'react';
import {screens} from './routeName.route';
import AddStage from '../modules/pipeline/stage/AddStage.module';
import AddDeal from '../modules/pipeline/stage/AddDeal.module';
import StageDetails from '../modules/pipeline/stage/StageDetails.module';
import AddPipeline from '../modules/pipeline/add-pipeline/AddPipeline.module';

const pipelineRoutes = Stack => {
  return [
    <Stack.Screen name={screens.addStage} component={AddStage} key={1} />,
    <Stack.Screen name={screens.addDeal} component={AddDeal} key={2} />,
    <Stack.Screen name={screens.addPipeline} component={AddPipeline} key={3} />,
    <Stack.Screen
      name={screens.stageDetails}
      component={StageDetails}
      key={4}
    />,
  ];
};

export default pipelineRoutes;

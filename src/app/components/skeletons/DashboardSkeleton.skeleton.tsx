import {View} from 'react-native';
import React from 'react';
import BaseSkeleton from './BaseSkeleton.skeleton';
import {customMargin} from '../../assets/styles/global.style.asset';

const DashboardSkeleton: React.FC = () => {
  return (
    <View>
      <BaseSkeleton width={'100%'} height={40} borderRadius={5} />
      <BaseSkeleton
        width={'100%'}
        height={300}
        borderRadius={10}
        style={{...customMargin(12)}}
      />
    </View>
  );
};

export default DashboardSkeleton;

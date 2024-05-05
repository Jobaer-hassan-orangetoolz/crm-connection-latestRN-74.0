import {View, ScrollView} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import Badge from '../../../components/app/Badge.app.component';
import {stageTabOptions} from '../../../assets/js/dropdown.data';
import {colors} from '../../../assets/styles/colors.style.asset';

const StageTab: React.FC<{
  handleStatus: (params: any) => void;
  status: number;
}> = ({handleStatus = () => {}, status = 1}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...customPadding(20, 20, 20, 20),
          gap: rs(8),
        }}>
        {stageTabOptions.map((item: any, index: number) => {
          return (
            <Badge
              text={item.name}
              onPress={() => {
                handleStatus(item.value);
              }}
              classes={status === item.value ? 'primary' : 'secondary'}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StageTab;

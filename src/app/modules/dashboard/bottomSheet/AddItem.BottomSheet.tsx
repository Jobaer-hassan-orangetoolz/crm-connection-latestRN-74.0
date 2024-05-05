import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CrossIcon from '../../../assets/icons/Cross.icon.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {addItemStyles as styles} from '../styles/addItem.style';
import {titles} from '../../../assets/js/titles.message';
import {addItemOptions} from '../../../assets/js/dropdown.data';
import {colors} from '../../../assets/styles/colors.style.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
const AddItemBottomSheet: React.FC = () => {
  const navigation = useCustomNavigation<any>();
  return (
    <View style={{...customPadding(0, 0, 10)}}>
      <View style={styles.container}>
        <Text style={[typographies.bodyLargeBold]}>{titles.addNew}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            global.showBottomSheet({flag: false});
          }}
          style={{...customPadding(0, 0, 0, 10)}}>
          <CrossIcon />
        </TouchableOpacity>
      </View>
      {addItemOptions.map((item: any, index: number) => {
        const {name, screens, Icon, options} = item || {};
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              navigation.navigate(screens, {...options});
              global.showBottomSheet({flag: false});
            }}
            style={styles.itemContainer}>
            <Icon fill={colors.primary} height={28} width={28} />
            <Text style={typographies.bodyMediumBold}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AddItemBottomSheet;

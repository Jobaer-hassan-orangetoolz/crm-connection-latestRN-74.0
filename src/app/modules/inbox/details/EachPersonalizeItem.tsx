import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
const EachPersonalizeItem: React.FC<any> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(item.value);
      }}>
      <Text style={styles.textStyle}> {item.label.replace(/_/g, ' ')}</Text>
    </TouchableOpacity>
  );
};
export default EachPersonalizeItem;
const styles = StyleSheet.create({
  container: {
    ...customPadding(10, 20, 10, 20),
  },
  textStyle: {
    ...typographies.bodyMedium,
  },
});

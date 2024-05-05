import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../assets/styles/colors.style.asset';

const TaskGraph: React.FC<{data: any}> = ({data}) => {
  const totalValue = Object.keys(data).reduce(
    (acc, value) => acc + data[value],
    0,
  );
  const calculatePercentage = (numerator: number, denominator: number) =>
    denominator === 0 ? 33.3 : (numerator * 100) / denominator;
  const completes = calculatePercentage(data.win, totalValue),
    due = calculatePercentage(data.lost, totalValue),
    pending = calculatePercentage(data.opened, totalValue);
  const total = completes + due + pending;

  return (
    <View style={styles.container}>
      <View
        style={[styles.complete, {width: `${(completes * 100) / total}%`}]}
      />
      <View style={[styles.due, {width: `${(due * 100) / total}%`}]} />
      <View style={[styles.pending, {width: `${(pending * 100) / total}%`}]} />
    </View>
  );
};
export default TaskGraph;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray10,
    height: 56,
    borderRadius: 12,
    // elevation: 1,
    overflow: 'hidden',
  },
  complete: {backgroundColor: '#316AFF', flexGrow: 1},
  due: {backgroundColor: '#00ff91', flexGrow: 1},
  pending: {backgroundColor: '#E60945', flexGrow: 1},
});

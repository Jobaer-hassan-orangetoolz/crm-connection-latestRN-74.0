/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomDropdown from '../../../components/core/CustomDropdown.core.component';
import {formatPhoneNumber, isEmpty} from '../../../utilities/helper.utility';
import {colors} from '../../../assets/styles/colors.style.asset';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import {titles} from '../../../assets/js/titles.message';

const VirtualNumbers = ({
  value = null,
  textStyles = {},
  onChange = () => {},
}: any) => {
  const {userVNs} = customUseSelector(userStates);
  const [virtualNumber, setVirtualNumber] = useState<string | null>(value);
  const dispatch = customUseDispatch();
  const getNumber = (numbers: any[]) => {
    const number = numbers.find((item: any) => {
      if (value) {
        return value === item.virtualNumber;
      }
      return item.isDefault === 1;
    });
    if (number) {
      setVirtualNumber(number.virtualNumber);
    }
  };
  const getDataHandler = async () => {
    dispatch(getUserVirtualNumber(true));
  };
  useEffect(() => {
    if (!isEmpty(userVNs)) {
      getNumber(userVNs);
    } else {
      dispatch(getUserVirtualNumber(true));
    }
  }, [userVNs]);
  const handleNumberChange = (item: any) => {
    setVirtualNumber(item.virtualNumber);
    onChange(item);
  };

  return (
    <View style={styles.container}>
      <CustomDropdown
        text={virtualNumber ? formatPhoneNumber(virtualNumber) : 'Select a vn'}
        iconFill={colors.gray0}
        component={BottomSheetSelect}
        componentProps={{
          options: {
            data: userVNs,
            title: titles.virtualNumber,
            refreshButton: true,
            titleFieldFormatter: (item: any) => {
              return formatPhoneNumber(item.virtualNumber);
            },
            getDataHandler,
          },
          onChange: handleNumberChange,
        }}
        textStyles={textStyles}
      />
    </View>
  );
};
export default VirtualNumbers;

const styles = StyleSheet.create({
  container: {flex: 1},
});

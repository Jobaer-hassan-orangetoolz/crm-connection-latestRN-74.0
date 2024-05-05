/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {titles} from '../../../assets/js/titles.message';
import CustomDropdown from '../../../components/core/CustomDropdown.core.component';
import {colors} from '../../../assets/styles/colors.style.asset';
import {callStyles as styles} from '../styles/callStyles.style';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {formatPhoneNumber} from '../../../utilities/helper.utility';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import {storeBottomSheetData} from '../../../states/features/bottomSheet/bottomSheet.slice';

const CallKeyboardHeader: React.FC<{contactInfo: any}> = ({contactInfo}) => {
  const {userVNs, defaultVNGetting, vnLoading} = customUseSelector(userStates);
  const [virtualNumber, setVirtualNumber] = useState<string>('');
  const dispatch = customUseDispatch();
  const getNumber = (numbers: any[]) => {
    const number = numbers.find((item: any) => {
      return item?.isDefault === 1;
    });
    dispatch(storeBottomSheetData({data: userVNs, name: titles.virtualNumber}));
    if (number) {
      contactInfo.current.virtualNumber = number.virtualNumber;
      contactInfo.current.vnId = number.id;
      setVirtualNumber(number.virtualNumber);
    } else {
      contactInfo.current.virtualNumber = '';
      setVirtualNumber('');
    }
  };
  const getDataHandler = async () => {
    dispatch(getUserVirtualNumber(true));
  };
  useEffect(() => {
    if (defaultVNGetting) {
      getNumber(userVNs);
    } else if (!defaultVNGetting) {
      dispatch(getUserVirtualNumber(true));
    }
  }, [userVNs]);
  const handleNumberChange = (item: any) => {
    setVirtualNumber(item.virtualNumber);
    contactInfo.current.virtualNumber = item.virtualNumber;
    contactInfo.current.vnId = item.id;
  };
  const renderRightSideHeader = () => {
    return (
      <View>
        <CustomDropdown
          text={formatPhoneNumber(virtualNumber)}
          iconFill={colors.primary}
          component={BottomSheetSelect}
          onClose={() => dispatch(storeBottomSheetData())}
          componentProps={{
            options: {
              data: userVNs,
              isLoading: vnLoading,
              title: titles.virtualNumber,
              refreshButton: true,
              selectedValue: virtualNumber,
              titleFieldFormatter: (item: any) => {
                return formatPhoneNumber(
                  item.virtualNumber ? item.virtualNumber : item,
                );
              },
              getDataHandler,
            },
            onChange: handleNumberChange,
          }}
        />
      </View>
    );
  };
  return (
    <IconWithTextHeader
      text={titles.dialer}
      rightComponent={renderRightSideHeader()}
      style={styles.iconContainer}
    />
  );
};

export default CallKeyboardHeader;

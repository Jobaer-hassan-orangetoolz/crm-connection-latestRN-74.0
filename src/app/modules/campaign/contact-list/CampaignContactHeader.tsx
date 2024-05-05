import {View} from 'react-native';
import React from 'react';
import InputWithIcon from '../../../components/core/input/InputWithIcon.core.component';
import {customPadding} from '../../../assets/styles/global.style.asset';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {colors} from '../../../assets/styles/colors.style.asset';
import {SCREEN_WIDTH} from '../../../assets/js/core.data';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {titles} from '../../../assets/js/titles.message';
import {buttons} from '../../../assets/js/buttons.message';
import SearchIcon from '../../../assets/icons/Search.icon.asset';
import CrossIcon from '../../../assets/icons/Cross.icon.asset';
import {placeholders} from '../../../assets/js/placeholders.message';

const CampaignContactHeader: React.FC<{
  search?: string;
  clearSearch?: () => void;
  handleDebounce?: () => void;
  handleSubmit: () => void;
  list?: boolean;
  rightTitle?: string;
  title?: string;
  isShowSearch?: boolean;
}> = ({
  search,
  clearSearch,
  rightTitle,
  handleDebounce,
  handleSubmit,
  list = true,
  title,
  isShowSearch = true,
}) => {
  return (
    <View style={{backgroundColor: colors.white, width: SCREEN_WIDTH}}>
      <RightLeftActionHeader
        leftIcon={<LeftArrowIcon />}
        title={
          title
            ? title
            : list
            ? titles.contactsList
            : titles.addContactToCampaign
        }
        right={
          rightTitle ? rightTitle : list ? buttons.addContact : buttons.save
        }
        rightHandlerDisable={false}
        rightHandler={handleSubmit}
        containerStyles={{...customPadding(10, 20, 10, 20)}}
        border={'noBorder'}
      />
      {isShowSearch && (
        <View style={{...customPadding(10, 20, 8, 20)}}>
          <InputWithIcon
            defaultValue={search}
            leftIcon={<SearchIcon />}
            rightIcon={search && <CrossIcon />}
            placeholder={placeholders.search}
            rightHandler={clearSearch}
            onChangeText={handleDebounce}
          />
        </View>
      )}
    </View>
  );
};

export default CampaignContactHeader;

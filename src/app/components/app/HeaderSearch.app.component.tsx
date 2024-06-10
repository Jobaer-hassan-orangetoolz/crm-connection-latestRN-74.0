import React, {useState} from 'react';
import HeaderSearchInput from '../core/input/HeaderSearchInput.core.component';
import RightLeftActionHeader from '../core/headers/RightLeftActionHeader.core.component';
import LeftArrowIcon from '../../assets/icons/LeftArrow.icon.asset';
interface headerSearchInterface {
  values?: string;
  handleChange: (params: string) => void;
  title: string;
  leftIcon?: boolean;
  border?: 'showBorder' | 'noBorder';
  leftIconHandler?: () => void;
}
const HeaderSearch: React.FC<headerSearchInterface> = ({
  handleChange,
  values,
  title,
  leftIcon = true,
  border = 'showBorder',
  leftIconHandler,
}) => {
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  return isShowSearch ? (
    <HeaderSearchInput
      onChange={(text: string) => handleChange(text)}
      cancelHandler={() => setIsShowSearch(false)}
      defaultValue={values}
      border={border}
    />
  ) : (
    <RightLeftActionHeader
      title={title}
      rightHandlerDisable={false}
      rightHandler={() => setIsShowSearch(true)}
      isAnimating={false}
      leftIconHandler={leftIconHandler}
      border={border}
      leftIcon={leftIcon ? <LeftArrowIcon height={28} width={28} /> : <></>}
    />
  );
};

export default HeaderSearch;

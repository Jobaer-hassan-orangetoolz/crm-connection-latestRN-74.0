import React, {useEffect, useRef} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {searchStyles as styles} from './styles/search.style';
import CrossIcon from '../../../assets/icons/Cross.icon.asset';
import BadgeButton from '../button/BadgeButton.core.component';
import {buttons} from '../../../assets/js/buttons.message';
import {placeholders} from '../../../assets/js/placeholders.message';
import {colors} from '../../../assets/styles/colors.style.asset';
import {headerSearchInterface} from './inputInterface';

const HeaderSearchInput: React.FC<headerSearchInterface> = ({
  onChange,
  defaultValue = '',
  cancelHandler = () => {},
  border = 'showBorder',
}) => {
  const crossRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnChange = (text: any) => {
    if (text.length > 0) {
      crossRef.current.setNativeProps({
        style: {display: 'flex'},
      });
      onChange(text);
    } else {
      crossRef.current.setNativeProps({
        style: {display: 'none'},
      });
      inputRef.current.setNativeProps({
        text: '',
      });
      onChange(text);
    }
  };
  return (
    <View style={[styles.container, border === 'noBorder' && styles.noBorder]}>
      <TextInput
        style={styles.input}
        placeholder={placeholders.search}
        numberOfLines={1}
        cursorColor={colors.gray0}
        placeholderTextColor={colors.gray4}
        onChangeText={handleOnChange}
        defaultValue={defaultValue?.toString()}
        ref={inputRef}
      />
      <TouchableOpacity onPress={() => handleOnChange('')}>
        <View
          style={
            defaultValue === '' ? styles.crossIconWrpNone : styles.crossIconWrp
          }
          ref={crossRef}>
          <CrossIcon height={24} width={24} />
        </View>
      </TouchableOpacity>
      <BadgeButton text={buttons.cancel} handler={cancelHandler} />
    </View>
  );
};
export default HeaderSearchInput;

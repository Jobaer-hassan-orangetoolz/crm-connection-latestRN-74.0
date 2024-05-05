import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {customPadding} from '../../../../../../../assets/styles/global.style.asset';
import {placeholders} from '../../../../../../../assets/js/placeholders.message';
import SearchIcon from '../../../../../../../assets/icons/Search.icon.asset';
import InputWithIcon from '../../../../../../../components/core/input/InputWithIcon.core.component';
import IconWithTextHeader from '../../../../../../../components/core/headers/IconWithTextHeader.app.component';

const UserListBottomSheet: React.FC<{
  setText: any;
  text?: any;
  position: any;
  store: any[];
}> = ({setText, text, position: {start = 0}, store}) => {
  const userList = [
    {name: 'Sohan Talukder', id: 1},
    {id: 2, name: 'Jobaer'},
    {id: 3, name: 'Erfan'},
  ];
  const handleClick = (_item: any) => {
    const value = `@[${_item.name}](id:${_item.id})`;
    const firstPart = text.substring(0, start);
    const secondPart = text.substring(start);
    const finalResult = !firstPart ? value : firstPart.replace(/.{1}$/, value);
    setText(finalResult + ' ' + secondPart);
    const finalName = '@' + _item.name;
    store.unshift({start, end: finalName.length + start});
    global.showBottomSheet({flag: false});
  };
  return (
    <View style={{...customPadding(0, 0, 40, 0)}}>
      <IconWithTextHeader
        text={'User List'}
        controlLeftIcon={() => {
          global.showBottomSheet({
            flag: false,
          });
        }}
      />
      <View style={{...customPadding(0, 20, 0, 20)}}>
        <InputWithIcon
          //           defaultValue={search}
          leftIcon={<SearchIcon />}
          //           rightIcon={search && <CrossIcon />}
          placeholder={placeholders.search}
          //           rightHandler={clearSearch}
          //           onChangeText={handleDebounce}
        />

        {userList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleClick(item)}
              style={{...customPadding(10, 20, 10, 20)}}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default UserListBottomSheet;

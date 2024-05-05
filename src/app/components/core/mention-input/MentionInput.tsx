/* eslint-disable prettier/prettier */
import {Text, Pressable, ScrollView, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import MentionInputComponent from './MentionInput.component';
import {MentionSuggestionsProps, Suggestion} from './mentionInput.interface';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';

const renderSuggestions: (
  suggestions: Suggestion[],
) => React.FC<MentionSuggestionsProps> =
  suggestions =>
  ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }
    return (
      <ScrollView
        style={{maxHeight: rs(200)}}
        keyboardShouldPersistTaps={'always'}>
        {suggestions
          .filter((one: any) =>
            one.fullName
              .toLocaleLowerCase()
              .match(new RegExp(keyword.toLowerCase())),
          )
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
              style={{padding: rs(6)}}>
              <Text style={typographies.bodySmallBold}>{one.fullName}</Text>
            </Pressable>
          ))}
      </ScrollView>
    );
  };

const MentionInput: React.FC<{
  data: any[];
  defaultValue?: string;
  style?: ViewStyle;
  onChange: (params: string) => void;
}> = ({data = [], onChange, defaultValue = '', style}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const handleChange = (text: string) => {
    setValue(text);
    onChange(text);
  };
  const renderMentionSuggestions = renderSuggestions(data);
  return (
    <MentionInputComponent
      defaultValue={value}
      onChange={handleChange}
      partTypes={[
        {
          trigger: '@',
          renderSuggestions: renderMentionSuggestions,
        },
      ]}
      placeholder="Type here..."
      style={style}
    />
  );
};

export default MentionInput;

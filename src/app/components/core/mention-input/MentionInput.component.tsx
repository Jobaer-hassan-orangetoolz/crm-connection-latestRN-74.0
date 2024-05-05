/* eslint-disable prettier/prettier */
import React, {MutableRefObject, useMemo, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSelectionChangeEventData,
  View,
} from 'react-native';

import {
  MentionInputProps,
  MentionPartType,
  Suggestion,
} from './mentionInput.interface';
import {
  generateValueFromPartsAndChangedText,
  generateValueWithAddedSuggestion,
  getMentionPartSuggestionKeywords,
  isMentionPartType,
  parseValue,
} from './mentionInput.utilty';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

const MentionInputComponent: React.FC<MentionInputProps> = ({
  defaultValue,
  onChange,
  partTypes = [],
  inputRef: propInputRef,

  containerStyle,

  onSelectionChange,

  ...textInputProps
}) => {
  const textInput = useRef<TextInput | null>(null);

  const [selection, setSelection] = useState({start: 0, end: 0});

  const {plainText, parts} = useMemo(
    () => parseValue(defaultValue, partTypes),
    [defaultValue, partTypes],
  );

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    setSelection(event.nativeEvent.selection);

    onSelectionChange && onSelectionChange(event);
  };

  const onChangeInput = (changedText: string) => {
    onChange(
      generateValueFromPartsAndChangedText(parts, plainText, changedText),
    );
  };
  const keywordByTrigger = useMemo(() => {
    return getMentionPartSuggestionKeywords(
      parts,
      plainText,
      selection,
      partTypes,
    );
  }, [parts, plainText, selection, partTypes]);
  const onSuggestionPress =
    (mentionType: MentionPartType) => (suggestion: Suggestion) => {
      const newValue = generateValueWithAddedSuggestion(
        parts,
        mentionType,
        plainText,
        selection,
        suggestion,
      );

      if (!newValue) {
        return;
      }
      onChange(newValue);
    };

  const handleTextInputRef = (ref: TextInput) => {
    textInput.current = ref as TextInput;

    if (propInputRef) {
      if (typeof propInputRef === 'function') {
        propInputRef(ref);
      } else {
        (propInputRef as MutableRefObject<TextInput>).current =
          ref as TextInput;
      }
    }
  };

  const renderMentionSuggestions = (mentionType: MentionPartType) => (
    <React.Fragment key={mentionType.trigger}>
      {mentionType.renderSuggestions &&
        mentionType.renderSuggestions({
          keyword: keywordByTrigger[mentionType.trigger],
          onSuggestionPress: onSuggestionPress(mentionType),
        })}
    </React.Fragment>
  );

  return (
    <View style={containerStyle}>
      <TextInput
        multiline
        {...textInputProps}
        ref={handleTextInputRef}
        onChangeText={onChangeInput}
        onSelectionChange={handleSelectionChange}>
        <Text>
          {parts.map(({text, partType, data}, index) =>
            partType ? (
              <Text
                key={`${index}-${data?.trigger ?? 'pattern'}`}
                style={
                  partType.textStyle ?? [
                    typographies.bodySmallBold,
                    {color: colors.gray1},
                  ]
                }>
                {text}
              </Text>
            ) : (
              <Text
                key={index}
                style={[typographies.bodySmall, {color: colors.gray4}]}>
                {text}
              </Text>
            ),
          )}
        </Text>
      </TextInput>

      {(
        partTypes.filter(
          one =>
            isMentionPartType(one) &&
            one.renderSuggestions != null &&
            !one.isBottomMentionSuggestionsRender,
        ) as MentionPartType[]
      ).map(renderMentionSuggestions)}
    </View>
  );
};

export default MentionInputComponent;

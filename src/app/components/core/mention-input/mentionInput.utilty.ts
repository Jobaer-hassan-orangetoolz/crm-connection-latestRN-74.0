/* eslint-disable prettier/prettier */
import {StyleProp, TextStyle} from 'react-native';
import {
  CharactersDiffChange,
  MentionData,
  MentionPartType,
  Part,
  PartType,
  Position,
  RegexMatchResult,
  Suggestion,
} from './mentionInput.interface';
import {diffChars} from './diff/diff-character';
const mentionRegEx = /((.)\[([^[]*)]\(([^(^)]*)\))/gi;

const defaultPlainStringGenerator = (
  {trigger}: MentionPartType,
  {fullName}: MentionData,
) => `${trigger}${fullName}`;

const isMentionPartType = (partType: PartType): partType is MentionPartType => {
  return (partType as MentionPartType).trigger != null;
};

const getPartIndexByCursor = (
  parts: Part[],
  cursor: number,
  isIncludeEnd?: boolean,
) => {
  return parts.findIndex(one =>
    cursor >= one.position.start && isIncludeEnd
      ? cursor <= one.position.end
      : cursor < one.position.end,
  );
};

const getPartsInterval = (
  parts: Part[],
  cursor: number,
  count: number,
): Part[] => {
  const newCursor = cursor + count;

  const currentPartIndex = getPartIndexByCursor(parts, cursor);
  const currentPart = parts[currentPartIndex];

  const newPartIndex = getPartIndexByCursor(parts, newCursor, true);
  const newPart = parts[newPartIndex];

  let partsInterval: Part[] = [];

  if (!currentPart || !newPart) {
    return partsInterval;
  }

  // Push whole first affected part or sub-part of the first affected part
  if (
    currentPart.position.start === cursor &&
    currentPart.position.end <= newCursor
  ) {
    partsInterval.push(currentPart);
  } else {
    partsInterval.push(
      generatePlainTextPart(
        currentPart.text.substr(cursor - currentPart.position.start, count),
      ),
    );
  }

  if (newPartIndex > currentPartIndex) {
    // Concat fully included parts
    partsInterval = partsInterval.concat(
      parts.slice(currentPartIndex + 1, newPartIndex),
    );

    // Push whole last affected part or sub-part of the last affected part
    if (
      newPart.position.end === newCursor &&
      newPart.position.start >= cursor
    ) {
      partsInterval.push(newPart);
    } else {
      partsInterval.push(
        generatePlainTextPart(
          newPart.text.substr(0, newCursor - newPart.position.start),
        ),
      );
    }
  }

  return partsInterval;
};

const getMentionPartSuggestionKeywords = (
  parts: Part[],
  plainText: string,
  selection: Position,
  partTypes: PartType[],
): {[trigger: string]: string | undefined} => {
  const keywordByTrigger: {[trigger: string]: string | undefined} = {};

  partTypes
    .filter(isMentionPartType)
    .forEach(({trigger, allowedSpacesCount = 1}) => {
      keywordByTrigger[trigger] = undefined;

      // Check if we don't have selection range
      if (selection.end != selection.start) {
        return;
      }

      // Find the part with the cursor
      const part = parts.find(
        one =>
          selection.end > one.position.start &&
          selection.end <= one.position.end,
      );

      // Check if the cursor is not in mention type part
      if (part == null || part.data != null) {
        return;
      }

      const triggerIndex = plainText.lastIndexOf(trigger, selection.end);

      // Return undefined in case when:
      if (
        // - the trigger index is not event found
        triggerIndex == -1 ||
        // - the trigger index is out of found part with selection cursor
        triggerIndex < part.position.start ||
        // - the trigger is not at the beginning and we don't have space or new line before trigger
        (triggerIndex > 0 && !/[\s\n]/gi.test(plainText[triggerIndex - 1]))
      ) {
        return;
      }

      // Looking for break lines and spaces between the current cursor and trigger
      let spacesCount = 0;
      for (
        let cursor = selection.end - 1;
        cursor >= triggerIndex;
        cursor -= 1
      ) {
        // Mention cannot have new line
        if (plainText[cursor] === '\n') {
          return;
        }

        // Incrementing space counter if the next symbol is space
        if (plainText[cursor] === ' ') {
          spacesCount += 1;

          // Check maximum allowed spaces in trigger word
          if (spacesCount > allowedSpacesCount) {
            return;
          }
        }
      }

      keywordByTrigger[trigger] = plainText.substring(
        triggerIndex + 1,
        selection.end,
      );
    });

  return keywordByTrigger;
};

/**
 * Generates new value when we changing text.
 *
 * @param parts full parts list
 * @param originalText original plain text
 * @param changedText changed plain text
 */
const generateValueFromPartsAndChangedText = (
  parts: Part[],
  originalText: string,
  changedText: string,
) => {
  const changes = diffChars(
    originalText,
    changedText,
  ) as CharactersDiffChange[];
  let newParts: Part[] = [];
  let cursor = 0;
  changes.forEach(change => {
    switch (true) {
      case change.removed: {
        cursor += change.count;
        break;
      }
      case change.added: {
        newParts.push(generatePlainTextPart(change.value));
        break;
      }
      default: {
        if (change.count !== 0) {
          newParts = newParts.concat(
            getPartsInterval(parts, cursor, change.count),
          );
          cursor += change.count;
        }
        break;
      }
    }
  });

  return getValueFromParts(newParts);
};

const generateValueWithAddedSuggestion = (
  parts: Part[],
  mentionType: MentionPartType,
  plainText: string,
  selection: Position,
  suggestion: Suggestion,
): string | undefined => {
  const currentPartIndex = parts.findIndex(
    one =>
      selection.end >= one.position.start && selection.end <= one.position.end,
  );
  const currentPart = parts[currentPartIndex];

  if (!currentPart) {
    return;
  }

  const triggerPartIndex = currentPart.text.lastIndexOf(
    mentionType.trigger,
    selection.end - currentPart.position.start,
  );

  const newMentionPartPosition: Position = {
    start: triggerPartIndex,
    end: selection.end - currentPart.position.start,
  };

  const isInsertSpaceToNextPart =
    mentionType.isInsertSpaceAfterMention &&
    // Cursor is at the very end of parts or text row
    (plainText.length === selection.end ||
      parts[currentPartIndex]?.text.startsWith(
        '\n',
        newMentionPartPosition.end,
      ));

  return getValueFromParts([
    ...parts.slice(0, currentPartIndex),

    // Create part with string before mention
    generatePlainTextPart(
      currentPart.text.substring(0, newMentionPartPosition.start),
    ),
    generateMentionPart(mentionType, {
      original: getMentionValue(mentionType.trigger, suggestion),
      trigger: mentionType.trigger,
      ...suggestion,
    }),

    // Create part with rest of string after mention and add a space if needed
    generatePlainTextPart(
      `${isInsertSpaceToNextPart ? ' ' : ''}${currentPart.text.substring(
        newMentionPartPosition.end,
      )}`,
    ),

    ...parts.slice(currentPartIndex + 1),
  ]);
};

/**
 * Method for generating part for plain text
 *
 * @param text - plain text that will be added to the part
 * @param positionOffset - position offset from the very beginning of text
 */
const generatePlainTextPart = (text: string, positionOffset = 0): Part => ({
  text,
  position: {
    start: positionOffset,
    end: positionOffset + text.length,
  },
});

/**
 * Method for generating part for mention
 *
 * @param mentionPartType
 * @param mention - mention data
 * @param positionOffset - position offset from the very beginning of text
 */
const generateMentionPart = (
  mentionPartType: MentionPartType,
  mention: MentionData,
  positionOffset = 0,
): Part => {
  const text = mentionPartType.getPlainString
    ? mentionPartType.getPlainString(mention)
    : defaultPlainStringGenerator(mentionPartType, mention);

  return {
    text,
    position: {
      start: positionOffset,
      end: positionOffset + text.length,
    },
    partType: mentionPartType,
    data: mention,
  };
};

/**
 * Generates part for matched regex result
 *
 * @param partType - current part type (pattern or mention)
 * @param result - matched regex result
 * @param positionOffset - position offset from the very beginning of text
 */
const generateRegexResultPart = (
  partType: PartType,
  result: RegexMatchResult,
  positionOffset = 0,
): Part => ({
  text: result[0],
  position: {
    start: positionOffset,
    end: positionOffset + result[0].length,
  },
  partType,
});

/**
 * Method for generation mention value that accepts mention regex
 *
 * @param trigger
 * @param suggestion
 */
const getMentionValue = (trigger: string, suggestion: Suggestion) =>
  `${trigger}[${suggestion.fullName}](${suggestion.id})`;

const getMentionDataFromRegExMatchResult = ([
  ,
  original,
  trigger,
  fullName,
  id,
]: RegexMatchResult): MentionData => ({
  original,
  trigger,
  fullName,
  id,
});

/**
 * Recursive function for deep parse MentionInput's value and get plainText with parts
 *
 * @param value - the MentionInput's value
 * @param partTypes - All provided part types
 * @param positionOffset - offset from the very beginning of plain text
 */
const parseValue = (
  value: string,
  partTypes: PartType[],
  positionOffset = 0,
): {plainText: string; parts: Part[]} => {
  if (value == null) {
    value = '';
  }

  let plainText = '';
  let parts: Part[] = [];

  // We don't have any part types so adding just plain text part
  if (partTypes.length === 0) {
    plainText += value;
    parts.push(generatePlainTextPart(value, positionOffset));
  } else {
    const [partType, ...restPartTypes] = partTypes;

    const regex = isMentionPartType(partType) ? mentionRegEx : partType.pattern;

    const matches: RegexMatchResult[] = Array.from(value.matchAll(regex));

    if (matches.length === 0) {
      return parseValue(value, restPartTypes, positionOffset);
    }

    if (matches[0].index != 0) {
      const text = value.substr(0, matches[0].index);

      const plainTextAndParts = parseValue(text, restPartTypes, positionOffset);
      parts = parts.concat(plainTextAndParts.parts);
      plainText += plainTextAndParts.plainText;
    }

    // Iterating over all found pattern matches
    for (let i = 0; i < matches.length; i++) {
      const result = matches[i];

      if (isMentionPartType(partType)) {
        const mentionData = getMentionDataFromRegExMatchResult(result);
        if (mentionData.trigger !== partType.trigger) {
          const plainTextAndParts = parseValue(
            mentionData.original,
            restPartTypes,
            positionOffset + plainText.length,
          );
          parts = parts.concat(plainTextAndParts.parts);
          plainText += plainTextAndParts.plainText;
        } else {
          const part = generateMentionPart(
            partType,
            mentionData,
            positionOffset + plainText.length,
          );

          parts.push(part);

          plainText += part.text;
        }
      } else {
        const part = generateRegexResultPart(
          partType,
          result,
          positionOffset + plainText.length,
        );

        parts.push(part);

        plainText += part.text;
      }

      // Check if the result is not at the end of whole value so we have a text after matched part
      // We should parse the text with rest part types
      if (result.index + result[0].length !== value.length) {
        // Check if it is the last result
        const isLastResult = i === matches.length - 1;

        // So we should to add the last substring of value after matched mention
        const text = value.slice(
          result.index + result[0].length,
          isLastResult ? undefined : matches[i + 1].index,
        );

        const plainTextAndParts = parseValue(
          text,
          restPartTypes,
          positionOffset + plainText.length,
        );
        parts = parts.concat(plainTextAndParts.parts);
        plainText += plainTextAndParts.plainText;
      }
    }
  }

  // Exiting from parseValue
  return {
    plainText,
    parts,
  };
};

/**
 * Function for generation value from parts array
 *
 * @param parts
 */
const getValueFromParts = (parts: Part[]) =>
  parts.map(item => (item.data ? item.data.original : item.text)).join('');

/**
 * Replace all mention values in value to some specified format
 *
 * @param value - value that is generated by MentionInput component
 * @param replacer - function that takes mention object as parameter and returns string
 */
const replaceMentionValues = (
  value: string,
  replacer: (mention: MentionData) => string,
) =>
  value.replace(mentionRegEx, (fullMatch, original, trigger, fullName, id) =>
    replacer({
      original,
      trigger,
      fullName,
      id,
    }),
  );

export {
  mentionRegEx,
  isMentionPartType,
  getMentionPartSuggestionKeywords,
  generateValueFromPartsAndChangedText,
  generateValueWithAddedSuggestion,
  generatePlainTextPart,
  generateMentionPart,
  getMentionValue,
  parseValue,
  getValueFromParts,
  replaceMentionValues,
};

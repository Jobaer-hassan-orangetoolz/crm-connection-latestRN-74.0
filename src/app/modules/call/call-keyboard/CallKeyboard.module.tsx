import React, {useRef} from 'react';
import Container from '../../../layouts/Container.layout';
import {colors} from '../../../assets/styles/colors.style.asset';
import {TextInput, View} from 'react-native';
import {callStyles as styles} from '../styles/callStyles.style';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import CallKeyboardHeader from './CallKeyboard.header';
import CallNumbersList from './CallNumbersList.module';
import NumberPad from './NumberPad.module';
import {placeholders} from '../../../assets/js/placeholders.message';

const CallKeyboard = () => {
  const textInputRef = useRef<TextInput>(null);
  let contactInfo = useRef<{
    number: string;
    name?: string;
    virtualNumber?: string;
  }>({
    number: '',
    name: '',
    virtualNumber: '',
  });
  return (
    <Container bg={colors.gray8}>
      <CallKeyboardHeader contactInfo={contactInfo} />
      <View style={styles.contactContainer}>
        <View style={styles.inputWrp}>
          <TextInput
            editable={false}
            ref={textInputRef}
            placeholder={placeholders.enterNumber}
            textAlign="center"
            placeholderTextColor={colors.gray4}
            style={[typographies.headingLarge, styles.textInput]}
          />
        </View>
        <CallNumbersList
          textInputRef={textInputRef}
          contactInfo={contactInfo}
        />
      </View>
      <NumberPad textInputRef={textInputRef} contactInfo={contactInfo} />
    </Container>
  );
};
export default CallKeyboard;

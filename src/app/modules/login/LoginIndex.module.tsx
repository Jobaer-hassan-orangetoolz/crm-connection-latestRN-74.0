import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SplashContainer from '../../layouts/SplashContainer.layout';
import {styles} from './styles/login.style';
import ImagePreview from '../../components/core/ImagePreview.core.component';
import {imageLink} from '../../assets/images/link.image.asset';
import EmailIcon from '../../assets/icons/Email.icon.asset';
import {placeholders} from '../../assets/js/placeholders.message';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {titles} from '../../assets/js/titles.message';
import {buttons} from '../../assets/js/buttons.message';
import ClickableText from '../../components/core/ClickableText.core.component';
import useLogin from './hooks/useLogin.hook';
import {colors} from '../../assets/styles/colors.style.asset';
import PasswordInput from '../../components/core/input/PasswordInput.core.component';
import CustomButton from '../../components/core/button/CustomButton.core.component';
import {textInput} from '../../assets/styles/properties.asset';
import InputLeftIcon from '../../components/core/input/InputLeftIcon.core.component';
import {globalStyles} from '../../assets/styles/global.style.asset';

const LoginIndex: React.FC = () => {
  const {
    handleLogin,
    handleNavigateToTC,
    onChangeValue,
    emailInputRef,
    passInputRef,
    isLoading,
  } = useLogin();
  return (
    <SplashContainer containerStyle={styles.mainContainer}>
      <KeyboardAvoidingView style={globalStyles.flex1}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={globalStyles.flex1}
          showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.flex1}>
              <View style={styles.logoContainer}>
                <ImagePreview source={imageLink.logo} styles={styles.logo} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[typographies.headingLarge, styles.headingText]}>
                  {titles.signIn}
                </Text>
                <View style={styles.gap16}>
                  <InputLeftIcon
                    icon={
                      <EmailIcon fill={colors.gray4} width={20} height={20} />
                    }
                    placeholder={placeholders.emailAddress}
                    name={titles.email}
                    onChangeText={onChangeValue}
                    inputProps={{
                      inputMode: textInput.inputMode.email,
                      ref: emailInputRef,
                      returnKeyType: textInput.type.next,
                      blurOnSubmit: false,
                      autoCapitalize: textInput.capitalize.none,
                      autoComplete: textInput.autoComplete.email,
                      onSubmitEditing: () => passInputRef.current.focus(),
                    }}
                  />
                  <PasswordInput
                    name={titles.password}
                    placeholder={placeholders.password}
                    onChangeText={onChangeValue}
                    inputRef={passInputRef}
                    onSubmitEditing={handleLogin}
                    returnKeyType={'go'}
                  />
                  <CustomButton
                    text={buttons.signIn}
                    classes="primary"
                    isLoading={isLoading}
                    onPress={handleLogin}
                  />
                  <View style={styles.conditionText}>
                    <Text style={[typographies.bodySmall, styles.textAlign]}>
                      {titles.bySigning}
                    </Text>
                    <ClickableText
                      text={titles.termsAndCond}
                      style={[
                        typographies.bodySmallBold,
                        {color: colors.gray4},
                      ]}
                      onPress={handleNavigateToTC}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SplashContainer>
  );
};
export default LoginIndex;

import {messages} from '../../assets/js/messages.message';
import {isEmailValid, isEmpty} from '../../utilities/helper.utility';

class loginValidator {
  isValidForLogin({email, password}: any) {
    if (isEmpty(email) || isEmpty(password)) {
      return messages.fillUpLoginForm;
    }
    if (email.includes('@')) {
      if (!isEmailValid(email)) {
        return messages.typeValidEmail;
      }
    }
    if (password.length < 6) {
      return messages.passwordLength;
    }
    return '';
  }
}

export default new loginValidator();

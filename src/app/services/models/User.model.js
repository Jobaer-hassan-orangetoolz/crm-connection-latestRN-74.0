import {isEmpty} from '../../utilities/helper.utility';

class User {
  statusActive = 1;
  statusInactive = 0;

  fields = {
    name: {
      length: '',
      apiResponse: '',
      nullable: false,
      required: false,
    },
    email: {
      length: '',
      apiResponse: '',
      nullable: false,
      required: false,
    },
    api_toke: {
      length: '',
      apiResponse: '',
      nullable: false,
      required: false,
    },
  };
  getName = contact => {
    if (!contact) {
      return '';
    }
    if (!isEmpty(contact.firstName) && !isEmpty(contact.lastName)) {
      return contact.firstName + ' ' + contact.lastName;
    } else if (!isEmpty(contact.firstName)) {
      return contact.firstName;
    } else if (!isEmpty(contact.lastName)) {
      return contact.lastName;
    }
  };
}

export default new User();

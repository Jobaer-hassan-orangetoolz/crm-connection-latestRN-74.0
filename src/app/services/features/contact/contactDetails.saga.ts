import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import contactApiHelper from '../../api/helper/contactApi.helper';
import {apiResponse} from '../../api/api.interface';
import {
  errorContactDetails,
  storeContactDetails,
} from '../../../states/features/contact/contactDetails.slice';
import {contactDetailsFormatter} from '../../formatter/contact.formatter';
import {blockNumberCheck} from '../../models/Contact.modal';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {messages} from '../../../assets/js/messages.message';

function* getContactDetails() {
  yield customTakeEvery(
    `${sliceName.contactDetailsSlice}/isGettingContactDetails`,
    getContactDetailsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactDetailsSlice}/refreshingContactDetails`,
    getContactDetailsSaga,
  );
}

function* getContactDetailsSaga(payload: any): Generator {
  const {id, navigation} = payload.payload;
  const result = yield customCall(contactApiHelper.getContactDetails, id);
  if (!result) {
    yield customPut(errorContactDetails());
    return;
  }
  const {body, status} = result as apiResponse;
  if (status && !isEmpty(body)) {
    yield customPut(
      storeContactDetails({
        ...contactDetailsFormatter(body),
        id,
      }),
    );
    const newItem = {
      isBlock: body.isBlock,
      isUnsubscribe: body.isUnsubscribe,
      lastEmail: body.lastEmail,
      lastNumber: body.lastNumber,
      id,
      expireDate: new Date(),
      numberExpireTime: new Date(),
    };
    const index = blockNumberCheck.findIndex(
      (item: any) => item.id === payload.payload,
    );
    if (index !== -1) {
      blockNumberCheck[index] = newItem;
    } else {
      blockNumberCheck.unshift(newItem);
    }
  } else {
    yield customPut(errorContactDetails());
    navigation.goBack();
    showAlertWithOneAction({
      title: messages.invalid,
      body: messages.accessPage,
    });
  }
}
export default function* contactDetailsSaga() {
  yield customSagaAll([getContactDetails()]);
}

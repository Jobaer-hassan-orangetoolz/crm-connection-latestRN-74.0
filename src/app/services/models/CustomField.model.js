class CustomField {
  TYPE_DEFAULT = 0;
  TYPE_TEXT = 1;
  TYPE_MULTILINE = 2;
  TYPE_NUMBER = 3;
  TYPE_DATE = 4;
  TYPE_CHECK = 5;
  TYPE_DROPDOWN = 6;
  TYPE_RADIO = 7;
  TYPE_PHONE = 8;
  TYPE_ZIP_CODE = 9;
  TYPE_URL = 10;
  TYPE_DATE_TIME = 11;
  TYPE_TIME = 'TYPE_TIME';

  LABELS = {
    [this.TYPE_DEFAULT]: 'Text Field',
    [this.TYPE_TEXT]: 'Text Field',
    [this.TYPE_MULTILINE]: 'Textarea Field',
    [this.TYPE_NUMBER]: 'Number Field',
    [this.TYPE_RADIO]: 'Group Radio button Field',
    [this.TYPE_DROPDOWN]: 'Dropdown Field',
    [this.TYPE_PHONE]: 'Phone Field',
    [this.TYPE_ZIP_CODE]: 'Zip Code Field',
    [this.TYPE_URL]: 'Url Field',
    [this.TYPE_CHECK]: 'Checkbox Field',
    [this.TYPE_DATE_TIME]: 'Date-time picker Field',
    [this.TYPE_DATE]: 'Date picker Field',
    [this.TYPE_TIME]: 'Time picker Field',
  };
}

export default new CustomField();

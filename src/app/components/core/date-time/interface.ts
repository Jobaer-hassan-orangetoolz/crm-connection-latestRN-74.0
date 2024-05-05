export interface dateTime {
  mode?: 'datetime' | 'date' | 'time';
  _onConfirm: any;
  _onCancel: any;
  value?: any;
  extraProps?: any;
  type?: string;
  text?: string;
  minimumDate?: string | any;
  timezone?: string;
}

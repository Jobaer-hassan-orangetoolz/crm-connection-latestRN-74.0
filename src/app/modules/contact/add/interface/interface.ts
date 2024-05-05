type itemT = {
  personalizeTag: string;
  title: string;
  typeId: number;
  defaultValues: string | null;
  id: number | string;
};
export interface eachCustomField {
  item: itemT;
  index: any;
  onSelect: any;
}

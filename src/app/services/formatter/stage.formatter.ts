export interface stageItemInterface {
  id: number;
  stage: string;
  colorCode: string;
  textColor: string;
  percentage: number;
  totalContacts: number;
  totalDeals: number;
}

export interface stageInterface {
  id: number;
  stage: string;
  colorCode: string;
  textColor: string;
  percentage: number;
  totalContacts: number;
  totalDeals: number;
}
const checkColor = (color: string) => {
  const has = color.startsWith('#');
  if (has) {
    return color;
  } else {
    return '#' + color;
  }
};
const stageFormatter = (item: stageItemInterface) => {
  return {
    id: item.id,
    stage: item.stage,
    colorCode: checkColor(item.colorCode),
    textColor: checkColor(item.textColor),
    percentage: item.percentage,
    totalContacts: item.totalContacts,
    totalDeals: item.totalDeals,
  };
};

export {stageFormatter};

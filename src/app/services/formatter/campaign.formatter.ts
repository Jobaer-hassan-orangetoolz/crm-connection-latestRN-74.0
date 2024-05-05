export interface campaignItemInterface {
  id: number;
  title?: string;
  status: number;
  createdAt: string;
  campaignType: number;
  totalContacts: number;
  totalContacted: number;
  totalResponed: number;
  folders: any[];
}
export interface contactCampaignInterface {
  campaignContactsStatus: number;
  campaignId: number;
  campaignTitle: string;
  campaignStatus: number;
  isUnsubscribed: number;
  userFullName: string;
  userId: number;
}
export interface campaignInterface {
  id: number;
  title?: string;
  status: number;
  createdAt?: string;
  campaignType?: number;
  totalContact?: number;
  totalContacted?: number;
  totalResponded?: number;
  responseRate?: number;
  folders?: any[];
  isUnsubscribed?: number;
}

const calculateResponseRate = (
  totalContacted: number,
  totalResponded: number,
) => {
  return totalContacted > 0
    ? ((totalResponded / totalContacted) * 100)?.toFixed(2)
    : '0.00';
};
const campaignFormatter = (item: campaignItemInterface) => {
  return {
    id: item.id,
    title: item.title,
    status: item.status,
    createdAt: item.createdAt,
    campaignType: item.campaignType,
    totalContact: item.totalContacts,
    totalContacted: item.totalContacted,
    totalResponded: item.totalResponed,
    responseRate: calculateResponseRate(
      item.totalContacted,
      item.totalResponed,
    ),
    folders: item.folders,
  };
};
const contactCampaignFormatter = (item: contactCampaignInterface) => {
  return {
    id: item.campaignId,
    title: item.campaignTitle,
    status: item.campaignStatus,
    isUnsubscribed: item.isUnsubscribed,
  };
};
export {campaignFormatter, contactCampaignFormatter};

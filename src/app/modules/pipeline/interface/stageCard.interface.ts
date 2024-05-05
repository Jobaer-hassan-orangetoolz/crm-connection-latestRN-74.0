import {contactDetails} from './../../../services/models/InboxThread.model';
import {
  stageDealItemInterface,
  stageDealInterface,
} from '../../../services/formatter/pipeline.formatter';
import {
  stageInterface,
  stageItemInterface,
} from '../../../services/formatter/stage.formatter';

export interface stageCardI {
  item?: stageItemInterface;
  index?: number;
  pipeline: any;
  onPress?: Function;
}

export interface flatListRenderITem {
  item?: stageDealItemInterface;
  index: number;
}

export interface useAddDealInterface {
  edit: boolean;
  success: (params: any, params2?: any, params3?: any) => void;
  deal: any;
  move?: boolean;
  pipeline?: stageDealInterface;
  stage?: stageInterface;
  index?: number;
  contactId?: number;
  contactDetails?: any;
}

export interface useAddDealStates {
  stage: string;
  stageId: number;
  pipeline: string;
  pipelineId: number;
  name: string;
  email: string;
  number: string;
  contactId: number;
  bgColor: string;
  dealValue: number;
  closingDate: Date;
  title: string;
}

export interface addDealParams {
  route: {
    params: {
      edit?: boolean;
      move?: boolean;
      from?: boolean;
      index?: number;
      contactDetails?: any;
      deal?: any;
      pipeline: stageDealInterface;
      success: (params: any) => void;
      stage: stageInterface;
    };
  };
}

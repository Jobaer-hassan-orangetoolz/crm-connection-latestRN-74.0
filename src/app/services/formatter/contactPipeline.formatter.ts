export interface contactPipelineItem {
  id: number;
  title?: string;
  user_stage_id: number;
  status: number;
  dealValue: number;
  stage: any;
}
export interface contactPipelineInterface {
  id: number;
  title?: string;
  userStageId: number;
  status: number;
  dealValue: number;
  stage: any;
}

const contactPipelineFormatter = (item: contactPipelineItem) => {
  return {
    id: item.id,
    title: item.title,
    userStageId: item.user_stage_id,
    status: item.status,
    dealValue: item.dealValue,
    stage: item.stage,
  };
};

const aboutContactPipelineFormatter = (item: any) => {
  return {
    id: item.id,
    title: item.title,
    user_stage_id: item.user_stage_id,
    status: item.status,
    dealValue: item.deal_value,
    stage: {
      id: item.id,
      stage: item.stage,
      pipeline_id: item.created_by,
      pipeline: {
        id: item.created_by,
        title: item.title,
      },
    },
  };
};

export {contactPipelineFormatter, aboutContactPipelineFormatter};

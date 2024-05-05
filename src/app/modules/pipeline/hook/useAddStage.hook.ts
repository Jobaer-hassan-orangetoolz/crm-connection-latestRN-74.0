import {useState} from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {probabilityPercentage} from '../../../assets/js/dropdown.data';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import {stageDealInterface} from '../../../services/formatter/pipeline.formatter';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import pipelineApiHelper from '../../../services/api/helper/pipelineApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {messages} from '../../../assets/js/messages.message';

const useAddStage = (
  stage: stageInterface,
  pipeline?: stageDealInterface,
  successStage?: (params: any) => void,
  edit?: boolean,
) => {
  const navigation = useCustomNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    stageName: stage?.stage,
    pipeline: pipeline?.title,
    pipelineId: pipeline?.pipelineId,
    probability: (probabilityPercentage as any)[stage?.percentage],
    probabilityValue: stage?.percentage,
    colorCode: stage?.colorCode,
    textColor: stage?.textColor,
  });
  const handleChange = (value?: any, name?: string) => {
    switch (name) {
      case 'pipeline':
        setValues((prev: any) => ({
          ...prev,
          pipeline: value?.title,
          pipelineId: value?.pipelineId,
        }));
        return;
      case 'probability':
        setValues((prev: any) => ({
          ...prev,
          probability: value?.title,
          probabilityValue: value?.value,
        }));
        return;
      default:
        setValues((prev: any) => ({...prev, [name]: value}));
        return;
    }
  };
  const loadPipeline = async ({}, callBack: any) => {
    const result = await pipelineApiHelper.getPipelineList();
    callBack(result);
  };
  const handleSubmit = async () => {
    if (
      values.stageName &&
      values.pipelineId &&
      values.colorCode &&
      values.textColor &&
      values.probability
    ) {
      const payload = {
        stageId: stage?.id,
        title: values.stageName,
        bgColor: values.colorCode,
        pipelineId: values.pipelineId,
        textColor: values.textColor,
        winProbability: values.probabilityValue,
      };
      let result;
      result = edit
        ? await pipelineApiHelper.editStage(payload)
        : await pipelineApiHelper.addStage(payload);
      setLoading(false);
      const {status, message, body} = result as apiResponse;
      if (status) {
        const successPayload = {
          ...values,
          id: body?.[0]?.id || stage?.id,
        };
        successStage && successStage(successPayload);
        navigation.goBack();
      } else {
        showAlertWithOneAction({title: messages.failed, body: message});
      }
    } else {
      showAlertWithOneAction({
        title: 'Invalid',
        body: 'Please input valid data!',
      });
    }
  };
  return {values, handleChange, loading, handleSubmit, loadPipeline};
};

export default useAddStage;

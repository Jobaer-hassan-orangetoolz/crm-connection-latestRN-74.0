import {useRef, useState} from 'react';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {apiResponse} from '../../../services/api/api.interface';
import {useCustomNavigation} from '../../../packages/navigation.package';
import pipelineApiHelper from '../../../services/api/helper/pipelineApi.helper';
import {messages} from '../../../assets/js/messages.message';
import {
  useAddDealInterface,
  useAddDealStates,
} from '../interface/stageCard.interface';
import {screens} from '../../../routes/routeName.route';
import {customUseDispatch} from '../../../packages/redux.package';
import {addCampaignToContact} from '../../../states/features/contact/aboutContact.slice';
import {aboutContactPipelineFormatter} from '../../../services/formatter/contactPipeline.formatter';
import {titles} from '../../../assets/js/titles.message';

const useAddDeal = ({
  edit,
  success,
  deal,
  move,
  pipeline,
  stage,
  index,
  contactId,
  contactDetails,
}: useAddDealInterface) => {
  const navigation = useCustomNavigation<any>();
  const [values, setValues] = useState<useAddDealStates>({
    stage: stage?.stage || '',
    stageId: stage?.id || -1,
    pipeline: pipeline?.title || '',
    pipelineId: pipeline?.pipelineId,
    name: deal?.name,
    number: deal?.number,
    email: deal?.email,
    contactId: deal?.contactId,
    bgColor: deal?.bgColor,
    dealValue: deal?.dealValue,
    closingDate: deal?.estimate_closing_date || new Date(),
    title: deal?.title,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = customUseDispatch();
  const stageName = useRef('');
  const handleChange = (value?: any, name?: string) => {
    switch (name) {
      case 'pipeline':
        setValues((prev: any) => ({
          ...prev,
          pipeline: value?.title,
          pipelineId: value?.pipelineId,
          stage: '',
          stageId: '',
        }));
        return;
      case 'stage':
        setValues((prev: any) => ({
          ...prev,
          stage: value?.stage,
          stageId: value?.id,
        }));
        stageName.current = value.stage;
        return;
      case 'contact':
        setValues((prev: any) => ({
          ...prev,
          name: value?.name,
          email: value?.email,
          number: value?.number,
          contactId: value?.id,
        }));
        return;
      default:
        setValues((prev: any) => ({
          ...prev,
          [name as any]: value,
        }));
        return;
    }
  };
  const handleSubmit = async () => {
    if (
      (values.contactId && values.title && values.pipelineId,
      values.stageId && values.dealValue && values.bgColor)
    ) {
      setLoading(true);
      const payload = {
        pipelineId: values.pipelineId,
        stageId: values.stageId,
        contactId: values.contactId,
        title: values.title,
        dealValue: values.dealValue,
        color: values.bgColor,
      };
      if (!isEmpty(contactId)) {
        payload.contactId = contactId;
      }
      const payloadForEdit = {
        ...payload,
        dealId: deal?.id,
        previousDealValue: deal?.dealValue,
        previousStageId: stage?.id,
      };
      const payloadForMove = {
        pipelineId: values.pipelineId,
        stageId: values.stageId,
        oldStageId: stage?.id,
        dealId: deal?.id,
      };
      let result;
      result = edit
        ? await pipelineApiHelper.editDeal(payloadForEdit)
        : move
        ? await pipelineApiHelper.moveDeal(payloadForMove)
        : await pipelineApiHelper.addDeal(payload);
      const {status, message, body} = result as apiResponse;
      if (status) {
        setLoading(false);
        if (!isEmpty(contactDetails)) {
          dispatch(
            addCampaignToContact(
              aboutContactPipelineFormatter({
                ...body[0],
                stage: stageName.current,
              }),
            ),
          ); //for about contact slice
          return showAlertWithOneAction({
            title: titles.done,
            body: 'Deal Added Successfully',
            onPressAction: () => {
              navigation.goBack();
            },
          });
        }
        const successPayload = {
          ...values,
          id: body?.[0]?.id || deal?.id,
          status: body?.[0]?.status || deal?.status,
        };
        success &&
          (values.stageId === stage?.id
            ? success(successPayload, index)
            : success('', index, true));
        edit || !isEmpty(contactId)
          ? navigation.goBack()
          : navigation.navigate(screens.stage);
      } else {
        setLoading(false);
        showAlertWithOneAction({title: messages.failed, body: message});
      }
    } else {
      showAlertWithOneAction({
        title: 'Invalid',
        body: 'Please input valid data!',
      });
    }
  };
  const loadPipeline = async ({}, callBack: any) => {
    const result = await pipelineApiHelper.getPipelineList();
    callBack(result);
  };
  const loadStage = async ({}, callBack: any) => {
    const result = await pipelineApiHelper.getStageList(values.pipelineId);
    const {status, body} = result as apiResponse;
    if (status) {
      callBack({status: true, body: body?.[0]});
    } else {
      callBack({status: false});
    }
  };
  return {
    handleChange,
    handleSubmit,
    values,
    loadPipeline,
    loadStage,
    loading,
  };
};

export default useAddDeal;

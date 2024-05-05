import {View} from 'react-native';
import React, {useRef, useState} from 'react';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../assets/js/titles.message';
import {buttons} from '../../../assets/js/buttons.message';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import CustomFieldModel from '../../../services/models/CustomField.model';
import Container from '../../../layouts/Container.layout';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import pipelineApiHelper from '../../../services/api/helper/pipelineApi.helper';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {customUseDispatch} from '../../../packages/redux.package';
import {isGettingAction} from '../../../states/features/deal/pipeline.slice';
const AddPipeline = () => {
  const value = useRef<string>('');
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (value.current) {
      const payload = {
        title: value.current,
        visibleInFunnel: true,
        visibleInStage: true,
      };
      setLoading(true);
      await pipelineApiHelper.addPipeline(payload);
      setLoading(false);
      dispatch(isGettingAction());
      navigation.goBack();
    } else {
      showAlertWithOneAction({title: 'Pipeline', body: "Title can't empty!"});
    }
  };
  return (
    <Container>
      <RightLeftActionHeader
        title={titles.addPipeline}
        right={buttons.save}
        rightHandlerDisable={loading}
        rightHandler={handleSubmit}
      />
      <View style={{...customPadding(20, 20, 20, 20)}}>
        <CustomFieldLayout
          label={'Title'}
          value={value.current}
          placeholder={'Title'}
          onChange={(text: string) => (value.current = text)}
          type={CustomFieldModel.TYPE_TEXT}
          showRemove={false}
        />
      </View>
    </Container>
  );
};

export default AddPipeline;

import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {addStageStyles as styles} from '../styles/addStage.style';
import Container from '../../../layouts/Container.layout';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../assets/js/titles.message';
import {buttons} from '../../../assets/js/buttons.message';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {addStageForms} from '../../../assets/js/dropdown.data';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import useAddStage from '../hook/useAddStage.hook';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import {stageDealInterface} from '../../../services/formatter/pipeline.formatter';
const AddStage: React.FC<{
  route: {
    params: {
      stage?: stageInterface;
      pipeline?: stageDealInterface;
      successStage?: (params: any) => void;
      edit: boolean;
    };
  };
}> = ({
  route: {params: {stage, pipeline, successStage, edit = false} = {}},
}) => {
  const {values, loadPipeline, handleChange, handleSubmit, loading} =
    useAddStage(stage, pipeline, successStage, edit);
  const renderOptions = (params: any) => {
    switch (params?.name) {
      case 'pipeline':
        return {
          ...params.options,
          titleField: 'title',
          getDataHandler: loadPipeline,
        };
      default:
        return params.options;
    }
  };
  return (
    <Container>
      <RightLeftActionHeader
        title={edit ? titles.editStage : titles.addStage}
        right={loading ? buttons.saving : buttons.save}
        rightHandlerDisable={loading}
        rightHandler={handleSubmit}
      />
      <KeyboardAvoidingView style={globalStyles.flex1}>
        <ScrollView
          style={globalStyles.flex1}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.containerStyle}>
          {addStageForms.map((each, eachIndex) => (
            <CustomFieldLayout
              label={each.title}
              value={values[each.name]}
              placeholder={each.placeholder}
              onChange={handleChange}
              type={each.dropdown ? 6 : 1}
              tag={each.name}
              index={eachIndex}
              key={eachIndex}
              disabled={edit && each.name === 'pipeline' ? true : false}
              options={renderOptions(each)}
              showRemove={false}
              Component={each.Component}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default AddStage;

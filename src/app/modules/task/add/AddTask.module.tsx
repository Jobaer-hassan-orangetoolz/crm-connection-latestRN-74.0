import React from 'react';
import Container from '../../../layouts/Container.layout';
import {colors} from '../../../assets/styles/colors.style.asset';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../assets/js/titles.message';
import {buttons} from '../../../assets/js/buttons.message';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {addTaskForms} from '../../../assets/js/dropdown.data';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import {addStageStyles as styles} from '../../pipeline/styles/addStage.style';
import {taskInterface} from '../../../services/formatter/task.formatter';
import {contactInterface} from '../../../services/formatter/contact.formatter';
import useAddTask from '../hooks/useAddTask.hook';
import {storeBottomSheetData} from '../../../states/features/bottomSheet/bottomSheet.slice';
const AddTask: React.FC<{
  route: {
    params: {
      edit?: boolean;
      contact?: boolean;
      item?: taskInterface;
      contactInfo?: contactInterface;
      index?: number;
      task?: number;
    };
  };
}> = ({
  route: {
    params: {
      edit = false,
      index = -1,
      contact = false,
      item,
      contactInfo,
      task,
    } = {},
  },
}) => {
  const {handleChange, renderOptions, loading, handleSubmit, dispatch, values} =
    useAddTask({
      edit,
      contact,
      item,
      contactInfo,
      index,
      task,
    });
  return (
    <Container bg={colors.white}>
      <RightLeftActionHeader
        title={edit ? titles.editTask : titles.newTask}
        right={loading ? buttons.saving : buttons.save}
        rightHandlerDisable={loading ? true : false}
        rightHandler={handleSubmit}
        leftIcon={<LeftArrowIcon />}
        isAnimating={false}
      />
      <KeyboardAvoidingView style={globalStyles.flex1}>
        <ScrollView
          style={globalStyles.flex1}
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyle}>
          {addTaskForms.map((each, eachIndex) => (
            <CustomFieldLayout
              label={each.title}
              value={
                (values as any)[each.name]?.title || (values as any)[each.name]
              }
              placeholder={each.placeholder}
              onChange={handleChange}
              type={each.type}
              tag={each.name}
              index={eachIndex}
              disabled={
                (edit && each.name === 'contact') ||
                (edit && each.name === 'assignTo')
                  ? true
                  : contact && each.name === 'contact'
                  ? true
                  : task && each.name === 'type'
                  ? true
                  : false
              }
              key={eachIndex}
              onClose={() => {
                dispatch(storeBottomSheetData());
              }}
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

export default AddTask;

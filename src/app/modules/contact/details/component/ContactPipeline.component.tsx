import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {contactPipelineInterface} from '../../../../services/formatter/contactPipeline.formatter';
import {
  customPadding,
  globalStyles,
} from '../../../../assets/styles/global.style.asset';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import DeleteIcon from '../../../../assets/icons/Delete.icon.asset';
import {showAlertWithTwoActions} from '../../../../utilities/helper.utility';
import {titles} from '../../../../assets/js/titles.message';
import {messages} from '../../../../assets/js/messages.message';
import contactApiHelper from '../../../../services/api/helper/contactApi.helper';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../../packages/redux.package';
import {storeContactDetails} from '../../../../states/features/contact/aboutContact.slice';
import {aboutContactStates} from '../../../../states/allSelector.state';

const ContactPipelineItem: React.FC<{
  item: contactPipelineInterface;
  id: number;
  index: number;
}> = ({item, id, index}) => {
  const {stage, title, id: dealId} = item;
  const dispatch = customUseDispatch();
  const {pipeline} = customUseSelector(aboutContactStates);
  const handleDelete = () => {
    const onPressAction = async (params: string) => {
      if (params === 'confirm') {
        const result = await contactApiHelper.contactDeleteDeal(dealId, id);
        if (result.status) {
          const updateArray = [...pipeline];
          updateArray.splice(index, 1);
          dispatch(storeContactDetails({pipeline: updateArray}));
        }
      }
    };
    showAlertWithTwoActions({
      title: titles.confirm,
      body: messages.deletePipelineMessage,
      onPressAction,
    });
  };
  return (
    <View style={[{...customPadding(12, 20, 12, 20)}, globalStyles.rowBetween]}>
      <View>
        <Text style={typographies.bodyMediumBold}>{title}</Text>
        <Text style={[typographies.bodySmall, {color: colors.gray4}]}>
          {stage?.stage}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <DeleteIcon fill={colors.error1} />
      </TouchableOpacity>
    </View>
  );
};

export default ContactPipelineItem;

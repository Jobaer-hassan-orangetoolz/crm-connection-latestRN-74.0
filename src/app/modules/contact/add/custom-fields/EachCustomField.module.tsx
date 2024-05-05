import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {eachCustomFieldStyles as styles} from '../styles/customfield.style';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {eachCustomField} from '../interface/interface';
import CustomFieldModel from '../../../../services/models/CustomField.model';

const EachCustomField: React.FC<eachCustomField> = ({
  item: {title, typeId, defaultValues, id},
  index,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => onSelect({title, typeId, defaultValues, id}, index)}>
      <Text style={typographies.bodyMediumBold}>{title}</Text>
      <Text style={typographies.bodySmall}>
        {CustomFieldModel.LABELS[typeId]}
      </Text>
    </TouchableOpacity>
  );
};
export default EachCustomField;

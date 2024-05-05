import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {stageCardStyles} from '../styles/stage.style';
import AddIcon from '../../../assets/icons/Add.icon.asset';
import {stageCardI} from '../interface/stageCard.interface';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {probabilityPercentage} from '../../../assets/js/dropdown.data';
import {customPadding} from '../../../assets/styles/global.style.asset';
const StageCard: React.FC<stageCardI> = ({item, index = -1, pipeline}) => {
  const navigation = useCustomNavigation<any>();
  const [value, setValue] = useState(item);
  const {stage, percentage, colorCode, totalContacts, textColor, totalDeals} =
    value;
  const styles = stageCardStyles({
    textColor: textColor,
    bgColor: colorCode,
  });
  const success = (values: any) => {
    const {dealValue = 0, contactId = -1} = values;
    const updateDeal = totalDeals + parseInt(dealValue, 10);
    let contact = totalContacts;
    const updateContact = contactId ? contact++ : contact;
    setValue({...value, totalDeals: updateDeal, totalContacts: updateContact});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(screens.stageDetails, {
          index,
          item: value,
          pipeline,
          updateStage: setValue,
        })
      }
      style={styles.container}>
      <View style={styles.headerWrp}>
        <View>
          <Text style={styles.headerText}>{stage}</Text>
          <Text style={styles.headerPercentage}>
            {(probabilityPercentage as any)[percentage]}
          </Text>
        </View>
        <View style={styles.actionWrp}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...customPadding(5, 5, 5, 5),
            }}
            onPress={() =>
              navigation.navigate(screens.addDeal, {
                from: true,
                stage: item,
                pipeline,
                success: success,
              })
            }>
            <AddIcon fill={textColor} height={22} width={22} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default StageCard;

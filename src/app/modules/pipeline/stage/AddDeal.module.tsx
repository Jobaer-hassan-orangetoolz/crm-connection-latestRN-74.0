import React from 'react';
import {ScrollView} from 'react-native';
import {addStageStyles as styles} from '../styles/addStage.style';
import Container from '../../../layouts/Container.layout';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../assets/js/titles.message';
import {buttons} from '../../../assets/js/buttons.message';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {addDealForms} from '../../../assets/js/dropdown.data';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import useAddDeal from '../hook/useAddDeal.hook';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {contactFormatter} from '../../../services/formatter/contact.formatter';
import {addDealParams} from '../interface/stageCard.interface';
import {formatPhoneNumber, isEmpty} from '../../../utilities/helper.utility';
const AddDeal: React.FC<addDealParams> = ({
  route: {
    params: {
      edit = false,
      move = false,
      from = false,
      pipeline,
      stage,
      contactDetails = {},
      success,
      deal,
      index,
    } = {},
  },
}) => {
  const {id, firstName, lastName, name, contactId, number} = contactDetails;
  const getTitle = () => {
    if (isEmpty(name) && isEmpty(firstName) && isEmpty(lastName)) {
      return `${formatPhoneNumber(number)}`;
    } else {
      if (!isEmpty(name)) {
        return name;
      }
      if (!isEmpty(firstName) && !isEmpty(lastName)) {
        return `${firstName} ${lastName}`;
      }
    }
    return `${formatPhoneNumber(number)}`;
  };
  const getId = () => {
    if (!isEmpty(id)) {
      return contactDetails;
    } else {
      contactDetails.id = contactId;
      return contactDetails;
    }
  };
  const {values, handleChange, loading, handleSubmit, loadPipeline, loadStage} =
    useAddDeal({
      edit,
      success,
      deal,
      move,
      pipeline,
      stage,
      index,
      contactId: id || contactId,
      contactDetails,
    });
  const renderOptions = (params: any) => {
    switch (params?.name) {
      case 'pipeline':
        return {
          ...params.options,
          titleField: 'title',
          getDataHandler: loadPipeline,
        };
      case 'stage':
        return {
          ...params.options,
          titleField: 'stage',
          getDataHandler: loadStage,
        };
      case 'contact':
        const getDataHandler = async (
          {
            page,
            perPage,
            search,
          }: {
            page: number;
            perPage: number;
            search?: string;
          },
          callback: any,
        ) => {
          const result = await contactApiHelper.getContactList({
            page,
            perPage,
            search,
          });
          const {status} = result as apiResponse;
          if (status) {
            callback(result);
          } else {
            callback({status: false});
          }
        };
        return {
          ...params.options,
          getDataHandler,
          formatter: contactFormatter,
          titleFieldFormatter: (__item: any) => {
            return __item.name || __item.email || __item.number;
          },
          flatList: true,
          search: true,
          refreshing: true,
        };
      default:
        return params.options;
    }
  };
  return (
    <Container>
      <RightLeftActionHeader
        title={edit ? titles.editDeal : move ? titles.moveDeal : titles.addDeal}
        right={loading ? buttons.saving : buttons.save}
        rightHandlerDisable={loading ? true : false}
        rightHandler={() => {
          if (!isEmpty(contactDetails)) {
            handleChange(getId(), 'contact');
          }
          handleSubmit();
        }}
      />
      <ScrollView
        style={globalStyles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}>
        {addDealForms.map((each, eachIndex) =>
          edit ? (
            each.name !== 'contact' && (
              <CustomFieldLayout
                label={each.title}
                value={(values as any)[each.name]}
                placeholder={each.placeholder}
                onChange={handleChange}
                type={each.type}
                tag={each.name}
                index={eachIndex}
                key={eachIndex}
                options={renderOptions(each)}
                showRemove={false}
                disabled={each.name === 'pipeline' ? true : false}
                Component={each.Component}
              />
            )
          ) : move ? (
            (each.name === 'pipeline' || each.name === 'stage') && (
              <CustomFieldLayout
                label={each.title}
                value={(values as any)[each.name]}
                placeholder={each.placeholder}
                onChange={handleChange}
                type={each.type}
                tag={each.name}
                index={eachIndex}
                key={eachIndex}
                options={renderOptions(each)}
                showRemove={false}
                Component={each.Component}
              />
            )
          ) : (
            <CustomFieldLayout
              label={each.title}
              value={
                each.name === 'contact'
                  ? !isEmpty(contactDetails)
                    ? getTitle()
                    : values.name || values.email || values.number
                  : (values as any)[each.name]
              }
              placeholder={each.placeholder}
              onChange={handleChange}
              type={each.type}
              tag={each.name}
              index={eachIndex}
              disabled={
                from
                  ? each.name === 'pipeline' || each.name === 'stage'
                    ? true
                    : false
                  : each.name === 'contact' && !isEmpty(contactDetails)
                  ? true
                  : false
              }
              key={eachIndex}
              options={renderOptions(each)}
              showRemove={false}
              Component={each.Component}
            />
          ),
        )}
      </ScrollView>
    </Container>
  );
};
export default AddDeal;

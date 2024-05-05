import React from 'react';
import {ScrollView, View} from 'react-native';
import Container from '../../../layouts/Container.layout';
import {addContactStyles as styles} from './styles/add-contact.style';
import RightLeftActionHeader from '../../../components/core/headers/RightLeftActionHeader.core.component';
import {buttons} from '../../../assets/js/buttons.message';
import {titles} from '../../../assets/js/titles.message';
import FormInput from '../../../components/app/FormInput.app.component';
import {addContactOptions} from '../../../assets/js/dropdown.data';
import ClickableText from '../../../components/core/ClickableText.core.component';
import CustomFieldLayout from './custom-fields/Layout.customField';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import useAddContact from './hooks/useAddContact.hook';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {formatStringToArray} from '../../../utilities/helper.utility';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';

export interface paramsP {
  id?: number;
  action?: 'edit' | 'add';
}
interface routeP {
  params?: paramsP;
}
interface routes {
  route?: routeP;
}

const AddContact: React.FC<routes> = ({route: {params: {id, action} = {}}}) => {
  const {
    handleGoToCustomFieldList,
    onChangeHandler,
    isSubmitting,
    handleSubmit,
    isFormValid,
    formValueRef,
    showMore,
    setShowMore,
    cfs,
    onChangeCustomFieldValue,
    removeCustomField,
    isLoading,
    customFieldFlagGroup,
    customFieldFlag,
  } = useAddContact({id, action});

  const renderView = () => {
    if (action && action === 'edit' && isLoading) {
      return <EmptyContent forLoading={true} />;
    } else {
      return renderForm();
    }
  };

  const renderForm = () => {
    return (
      <>
        {addContactOptions.map((item, index) => {
          if (item.group) {
            const fields = item.list.map((field: any, indexField: any) => (
              <FormInput
                item={field}
                onChangeHandler={onChangeHandler}
                key={indexField}
                showMore={showMore}
                values={formValueRef.current}
              />
            ));
            return (
              <View style={styles.groupFieldWrp} key={index}>
                {!showMore && (
                  <View style={globalStyles.rowBetween}>
                    <ClickableText
                      onPress={() => setShowMore(true)}
                      text={titles.moreOptions}
                      style={styles.hasMore}
                    />
                    {customFieldFlagGroup() && (
                      <ClickableText
                        onPress={handleGoToCustomFieldList}
                        text={titles.addCustomField}
                        style={styles.hasMore}
                      />
                    )}
                  </View>
                )}
                {fields}
              </View>
            );
          } else {
            return (
              <FormInput
                item={item}
                onChangeHandler={onChangeHandler}
                key={index}
                showMore={showMore}
                values={formValueRef.current}
              />
            );
          }
        })}
        {/* custom fields */}
        {cfs.map((each: any, eachIndex: any) => {
          return (
            <CustomFieldLayout
              label={each.title}
              value={formatStringToArray(each.defaultValues)[0]}
              onChange={onChangeCustomFieldValue}
              type={each.typeId}
              tag={each.personalizeTag}
              index={eachIndex}
              key={eachIndex}
              Component={BottomSheetSelect}
              options={{
                data: formatStringToArray(each.defaultValues),
                customFiled: true,
              }}
              onRemove={removeCustomField}
            />
          );
        })}
        {customFieldFlag() && (
          <ClickableText
            onPress={handleGoToCustomFieldList}
            text={titles.addCustomField}
            style={styles.hasMore}
          />
        )}
      </>
    );
  };

  return (
    <Container>
      <RightLeftActionHeader
        title={
          action && action === 'edit' ? titles.editContact : titles.newContact
        }
        right={isSubmitting ? buttons.saving : buttons.save}
        rightHandlerDisable={isSubmitting}
        rightHandler={handleSubmit}
        isAnimating={isFormValid}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.containerStyle,
          action && action === 'edit' && isLoading
            ? globalStyles.centerView
            : {},
        ]}>
        {renderView()}
      </ScrollView>
    </Container>
  );
};
export default AddContact;

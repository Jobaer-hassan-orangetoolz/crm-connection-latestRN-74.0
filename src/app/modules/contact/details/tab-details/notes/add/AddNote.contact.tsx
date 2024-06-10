import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../../../../../layouts/Container.layout';
import {colors} from '../../../../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../../../../assets/styles/global.style.asset';
import {typographies} from '../../../../../../assets/styles/typographies.style.asset';
import RightLeftActionHeader from '../../../../../../components/core/headers/RightLeftActionHeader.core.component';
import {titles} from '../../../../../../assets/js/titles.message';
import LeftArrowIcon from '../../../../../../assets/icons/LeftArrow.icon.asset';
import {buttons} from '../../../../../../assets/js/buttons.message';
import CustomDropdown from '../../../../../../components/core/CustomDropdown.core.component';
import BottomSheetSelect from '../../../../../../components/app/BottomSheetSelect.app.component';
import {contactFormatter} from '../../../../../../services/formatter/contact.formatter';
import MentionInput from '../../../../../../components/core/mention-input/MentionInput';
import useAddNote from '../../../../hooks/useAddNote.hook';
import {momentTimezone} from '../../../../../../packages/momentTimezone.package';
import {userLocalTimezone} from '../../../../../../services/models/_Timezone.modal';

const AddNote: React.FC<{
  route: {params: {id?: number; contact?: boolean}};
}> = ({route: {params: {id = -0, contact = false} = {}}}) => {
  const {
    handleNumberChange,
    onChange,
    getDataHandler,
    contactInfo,
    handleSave,
    note,
    teamUser,
  } = useAddNote(id, contact);
  return (
    <Container bg={colors.white}>
      <RightLeftActionHeader
        title={titles.addNote}
        leftIcon={<LeftArrowIcon />}
        right={buttons.save}
        rightHandlerDisable={contactInfo.id ? false : true}
        rightHandler={handleSave}
        isAnimating={false}
      />
      <View style={{...customPadding(20, 20, 20, 20)}}>
        <View style={styles.container}>
          <Text style={[typographies.bodyXS, styles.time]}>
            {momentTimezone()
              .tz(userLocalTimezone.timezone)
              .format('MMM DD, YYYY')}
          </Text>
          {!id && (
            <CustomDropdown
              text={contactInfo.name || 'Select Contact'}
              component={BottomSheetSelect}
              componentProps={{
                options: {
                  title: titles.contacts,
                  selectedValue: contactInfo.name,
                  refreshing: true,
                  search: true,
                  formatter: contactFormatter,
                  flatList: true,
                  titleFieldFormatter: (__item: any) => {
                    return __item.name || __item.email || __item.number;
                  },
                  getDataHandler,
                },
                onChange: handleNumberChange,
              }}
              containerStyles={styles.select}
            />
          )}
        </View>
        <MentionInput data={teamUser} onChange={onChange} defaultValue={note} />
      </View>
    </Container>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  time: {
    color: colors.gray4,
    flexGrow: 1,
  },
  select: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

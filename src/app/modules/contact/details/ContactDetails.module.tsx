import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container.layout';
import {colors} from '../../../assets/styles/colors.style.asset';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {contactBottomSheetStyles} from '../styles/contactBottomSheet.styles';
import EditIcon from '../../../assets/icons/Edit.icon.asset';
import DeleteIcon from '../../../assets/icons/Delete.icon.asset';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import ContactInfoComponent from './component/ContactInfo.component';
import ContactTabDetailsIndex from './tab-details/ContactTabDetails.index';
import useContactDetails from '../hooks/useContactDetails.hook';
import ContactTab from './component/ContactTab.component';
import {contactTagsStyles as styles} from '../styles/contactTags.styles';
const ContactDetails: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route: {
    params: {id, index},
  },
}) => {
  const {
    data,
    isLoading,
    tab,
    onRefresh,
    refreshing,
    setTab,
    handleDeleteContact,
    handleEditContact,
  } = useContactDetails(id, index);
  return (
    <Container ph={0} bg={colors.gray9} activityBgColor={colors.white}>
      <IconWithTextHeader
        controlLeftIcon={() => navigation.goBack()}
        style={{backgroundColor: colors.white}}
        rightComponent={
          <View style={contactBottomSheetStyles.headerContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={handleEditContact}>
              <EditIcon width={28} height={28} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={handleDeleteContact}>
              <DeleteIcon fill={colors.error1} width={28} height={28} />
            </TouchableOpacity>
          </View>
        }
      />
      {isLoading ? (
        <View
          style={[
            globalStyles.centerView,
            {backgroundColor: `${colors.white}`},
          ]}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flexGrow}
          stickyHeaderIndices={[0]}>
          <View>
            <ContactInfoComponent
              item={data}
              style={{
                ...customPadding(12, 20, 0, 20),
                backgroundColor: colors.white,
              }}
            />
            <ContactTab
              style={{backgroundColor: colors.white}}
              tab={tab}
              setTab={setTab}
            />
          </View>
          <ContactTabDetailsIndex tab={tab} id={id} item={data} />
        </ScrollView>
      )}
    </Container>
  );
};

export default ContactDetails;

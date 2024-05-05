import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Container from '../../../layouts/Container.layout';
import CampaignContactHeader from './CampaignContactHeader';
import CustomFieldLayout from '../../contact/add/custom-fields/Layout.customField';
import {titles} from '../../../assets/js/titles.message';
import CustomFieldModel from '../../../services/models/CustomField.model';
import BottomSheetSelect from '../../../components/app/BottomSheetSelect.app.component';
import {campaignItemInterface} from '../../../services/formatter/campaign.formatter';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
const SelectCampaign: React.FC<{
  route: {params: {contactIds: number[]}};
}> = ({route: {params: {contactIds = []} = {}}}) => {
  const [campaign, setCampaign] = useState<campaignItemInterface>();
  const [loading, setLoading] = useState(false);
  const navigation = useCustomNavigation<any>();
  const handleSave = () => {
    const payload = {contactIds, campaignId: campaign.id};
    campaignApiHelper.addContactToCampaign(payload);
    navigation.navigate(screens.dashboard);
  };
  const handleChange = (value: campaignItemInterface) => {
    setCampaign(value);
  };
  const getDataHandler = async (query: any, success: any) => {
    setLoading(true);
    const result = await campaignApiHelper.getCampaignList({
      page: query.page,
      perPage: query.perPage,
      search: query?.search,
    });
    success(result);
  };
  return (
    <Container>
      <CampaignContactHeader
        list={false}
        isShowSearch={false}
        handleSubmit={handleSave}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{...customPadding(20, 20, 20, 20)}}>
        <CustomFieldLayout
          value={campaign?.title}
          label={'Select Campaign'}
          placeholder={'Select Campaign'}
          showRemove={false}
          onChange={handleChange}
          options={{
            titleField: 'title',
            title: titles.campaign,
            search: true,
            refreshButton: true,
            isLoading: loading,
            selectedValue: campaign?.title,
            getDataHandler,
          }}
          tag={'campaign'}
          Component={BottomSheetSelect}
          type={CustomFieldModel.TYPE_DROPDOWN}
        />
      </ScrollView>
    </Container>
  );
};

export default SelectCampaign;

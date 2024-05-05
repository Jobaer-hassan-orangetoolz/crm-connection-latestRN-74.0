import {View, Text} from 'react-native';
import React from 'react';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {titles} from '../../assets/js/titles.message';
import CampaignFolderBottomSheet from './bottomSheet/CampaignFolder.bottomSheet';
import {campaignStyles as styles} from './styles/campaign.styles';
import CampaignTab from './component/CampaignTab.campaign';
import useCampaignFolder from './hook/useCampaignFolder.hook';
import CustomDropdown from '../../components/core/CustomDropdown.core.component';
import HeaderSearch from '../../components/app/HeaderSearch.app.component';
const CampaignTopHeader: React.FC<{
  handleStatus: (params: any) => void;
  clearSearch: Function;
  handleFolder: Function;
  status?: number;
  handleDebounce: (params: any) => void;
  search?: string;
  folder?: any;
}> = ({
  handleStatus = () => {},
  handleFolder = () => {},
  status = 0,
  handleDebounce = () => {},
  search = '',
  folder = {},
}) => {
  const {isLoading, list} = useCampaignFolder();
  return (
    <View style={{backgroundColor: colors.white}}>
      <HeaderSearch
        title={titles.campaigns}
        values={search}
        leftIcon={false}
        border={'noBorder'}
        handleChange={handleDebounce}
      />
      <View style={styles.headerContainer}>
        <Text style={[typographies.bodyMediumBold, {color: colors.gray4}]}>
          {titles.folder}:
        </Text>
        <CustomDropdown
          text={folder.title || titles.allCampaigns}
          component={CampaignFolderBottomSheet}
          iconFill={colors.primary}
          textStyles={{...typographies.bodyMediumBold, color: colors.gray0}}
          containerStyles={styles.flex}
          componentProps={{list, isLoading, handleFolder, folder}}
        />
      </View>
      <CampaignTab handleStatus={handleStatus} status={status} />
    </View>
  );
};

export default CampaignTopHeader;

import {View} from 'react-native';
import React from 'react';
import CampaignCount from '../../../components/app/CampaignCount.app.component';
import CloseIcon from '../../../assets/icons/Close.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import ChatIcon from '../../../assets/icons/Chat.icon.asset';
import OutlineCheckCircleIcon from '../../../assets/icons/OutlineCheckCircle.icon.asset';
import CampaignIcon from '../../../assets/icons/Campaign.icon.asset';
import {titles} from '../../../assets/js/titles.message';
import UsersIcon from '../../../assets/icons/Users.icon.asset';
import {campaignDetailsStyles as styles} from '../styles/campaignDetails.style';
import BounceIcon from '../../../assets/icons/Bounce.icon.asset';
const CampaignCounter: React.FC<{item: any}> = ({item = {}}) => {
  const {
    stats: {
      totalContact = 120,
      totalSend = '89',
      totalOpened = '34.9%',
      totalResponded = '20%',
      totalBounced = '29%',
      totalUnsubscribed = '37%',
    } = {},
  } = item;
  return (
    <View style={styles.middleContainer}>
      <CampaignCount
        icon={<UsersIcon height={20} width={20} fill={colors.primary} />}
        count={totalContact || 0}
        type={titles.contacts + '                '}
        style={styles.width}
      />
      <CampaignCount
        icon={<CampaignIcon height={20} width={20} fill={colors.primary} />}
        count={totalSend || 0}
        type={titles.opened}
        style={styles.width}
      />
      <CampaignCount
        icon={
          <OutlineCheckCircleIcon
            height={20}
            width={20}
            fill={colors.primary}
          />
        }
        count={totalOpened || 0}
        type={titles.opened}
        style={styles.width}
      />
      <CampaignCount
        icon={<ChatIcon height={20} width={20} fill={colors.primary} />}
        count={totalResponded || 0}
        type={titles.responded}
        style={styles.width}
      />
      <CampaignCount
        icon={<BounceIcon height={20} width={20} fill={colors.primary} />}
        count={totalBounced || 0}
        type={titles.responded}
        style={styles.width}
      />
      <CampaignCount
        icon={<CloseIcon height={20} width={20} fill={colors.primary} />}
        count={totalUnsubscribed || 0}
        type={titles.responded}
        style={styles.width}
      />
    </View>
  );
};

export default CampaignCounter;

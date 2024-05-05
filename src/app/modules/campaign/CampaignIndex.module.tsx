import React from 'react';
import Container from '../../layouts/Container.layout';
import {colors} from '../../assets/styles/colors.style.asset';
import CampaignsList from './CampaignsList.module';

const CampaignIndex: React.FC = () => {
  return (
    <Container bg={colors.secondary} statusBarBg={colors.white}>
      <CampaignsList />
    </Container>
  );
};

export default CampaignIndex;

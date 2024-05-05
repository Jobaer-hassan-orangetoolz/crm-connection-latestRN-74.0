import React from 'react';
import useHome from './hooks/useHome.hook';
import BottomTab from '../../components/app/BottomTab.app.component';
import CustomDrawer from '../../components/core/custom-drawer/CustomDrawer.core.component';

const Home: React.FC = () => {
  const {drawerRef, isShowDrawer, handleTabClick} = useHome();

  return (
    <>
      <BottomTab onClick={(screen: any) => handleTabClick(screen)} />
      {isShowDrawer && (
        <CustomDrawer
          ref={drawerRef}
          onClose={() => handleTabClick('drawer', false)}
        />
      )}
    </>
  );
};
export default Home;

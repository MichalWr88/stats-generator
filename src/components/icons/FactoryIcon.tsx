import React from 'react';
import HomeIcon from './HomeIcon';
import SettingsIcon from './SettingsIcon';

type Props = {
  icon: 'home' | 'factory' | 'settings' | 'logout';
};

const FactoryIcon = ({ icon }: Props) => {
  switch (icon) {
    case 'home':
      return <HomeIcon />;
    case 'settings':
      return <SettingsIcon />;

    default:
      throw new Error('Invalid Icon');
  }
};

export default FactoryIcon;

import ConfigTable from '@/components/ConfigTable';
import WithNavBar from 'layouts/WithNavBar';
import React from 'react';

const ConfigPage = () => {
  return (
    <WithNavBar>
      <ConfigTable></ConfigTable>
    </WithNavBar>
  );
};

export default ConfigPage;

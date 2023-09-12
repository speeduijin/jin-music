import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from '../component/GlobalHeader';

const Default = () => {
  return (
    <>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Default;

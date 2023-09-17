import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const Default = () => {
  return (
    <>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
      <div>뮤직플레이어</div>
    </>
  );
};

export default Default;

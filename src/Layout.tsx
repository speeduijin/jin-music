import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from './component/GlobalHeader';

const Layout = () => {
  return (
    <>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

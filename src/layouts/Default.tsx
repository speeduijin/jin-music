import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import axios from 'axios';
import GlobalHeader from '../components/GlobalHeader';

const Default = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/user/info');
        const user = response.data;
        user && setIsLoggedIn(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status < 500) {
            const message: string = error.response?.data.message;
            return message;
          } else {
            throw new Response();
          }
        }
      }
    })();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.get('/auth/logout');
      if (response.data.message === 'Logout successful.') setIsLoggedIn(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status < 500) {
          const message: string = error.response?.data.message;
          alert(message);
          redirect('/');
        } else {
          throw new Response();
        }
      }
    }
  };

  return (
    <>
      <GlobalHeader isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <main>
        <Outlet context={isLoggedIn} />
      </main>
      <div>뮤직플레이어</div>
    </>
  );
};

export default Default;

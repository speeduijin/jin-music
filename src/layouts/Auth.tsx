import axios from 'axios';
import React from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

export const authLoader = async () => {
  try {
    const response = await axios.get('/auth/isnotloggedin');
    return response.data.message;
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
};

const Auth = () => {
  const message = useLoaderData() as string;

  return message === 'ok' ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Auth;

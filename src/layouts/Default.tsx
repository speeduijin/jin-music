import React, { useState } from 'react';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import GlobalHeader from '../components/GlobalHeader';
import Player from '../components/Player';
import User from '../types/user';
import { Message, Playlist } from '../types';

export const userLoader = async () => {
  try {
    const response = await axios.get<User>('/user/info');
    const user = response.data;
    return user;
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

const Default = () => {
  const userData = useLoaderData() as User;

  const [isLoggedIn, setIsLoggedIn] = useState(userData && true);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  const handlePlaylist = (playlist: Playlist[]) => {
    setPlaylist(playlist);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get<Message>('/auth/logout');
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
        <Outlet context={{ isLoggedIn, handlePlaylist }} />
      </main>
      <Player playlist={playlist} />
    </>
  );
};

export default Default;

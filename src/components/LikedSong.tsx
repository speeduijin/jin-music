import React, { useState } from 'react';
import { Navigate, useLoaderData, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Song from '../types/song';

export const likedSongLoader = async () => {
  try {
    const response = await axios.get<Song[]>('/user/likedsong');
    return response.data;
  } catch (error) {
    throw new Response();
  }
};

interface Context {
  handlePlaylist: (plalist: string | string[]) => void;
}

const LikedSong = () => {
  const isLoggedInData = useOutletContext() as boolean;
  const likedSongData = useLoaderData() as Song[];
  const { handlePlaylist } = useOutletContext() as Context;

  const videoIdList = likedSongData.map((data) => data.youtube_video_id);

  const [likedSongs, setLikedSongs] = useState(likedSongData);

  const delLike = async (songId: number) => {
    try {
      const response = await axios.delete(`/user/likedsong/${songId}`);
      const result = likedSongs.filter((e) => e.id !== songId);
      setLikedSongs([...result]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.message;
        alert(message);
      }
    }
  };

  if (!isLoggedInData) return <Navigate to="/" />;

  return (
    <section className="liked-song">
      <div className="liked-song-header">
        <h2 className="liked-song-title">좋아요 표시한 곡</h2>

        <button
          type="button"
          onClick={() => {
            handlePlaylist(videoIdList);
          }}
          className="btn-play btn"
        >
          ▶
        </button>
      </div>
      <ol className="liked-song-list">
        {likedSongs.map((song) => (
          <li className="liked-song-item" key={song.id}>
            <div className="liked-song-item-left">
              <div className="liked-song-content">
                <h3 className="liked-song-content-song">{song.name}</h3>
                <p className="liked-song-content-artist">{song.artist_name}</p>
              </div>
            </div>
            <div className="liked-song-button">
              <div className="chart-button">
                <button
                  type="button"
                  onClick={() => delLike(song.id)}
                  className="btn-liked"
                >
                  Unlike
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default LikedSong;

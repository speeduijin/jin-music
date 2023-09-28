import React, { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Song from '../types/song';
import User from '../types/user';

export const chartLoader = async () => {
  try {
    const response = await axios.get<Song[]>('/song/chart');
    return response.data;
  } catch (error) {
    throw new Response();
  }
};

interface Context {
  isLoggedIn: boolean;
  handlePlaylist: (plalist: string | string[]) => void;
  handlePlay: () => void;
}

const Chart = () => {
  const chartData = useLoaderData() as Song[];
  const { isLoggedIn, handlePlaylist, handlePlay } =
    useOutletContext() as Context;

  const [likes, setLikes] = useState<number[]>([]);

  // console.log(playList);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<User>('/user/info');
        const user = response.data;
        if (user) {
          const likesResponse = await axios.get<number[]>('/user/likedsongid');
          setLikes([...likesResponse.data]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status < 500) {
            const message: string = error.response?.data.message;
            alert(message);
          } else {
            throw new Response();
          }
        }
      }
    })();
  }, []);

  const postLike = async (songId: number) => {
    try {
      const response = await axios.post(`/user/likedsong/${songId}`);
      setLikes([...likes, songId]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.message;
        alert(message);
      }
    }
  };

  const delLike = async (songId: number) => {
    try {
      const response = await axios.delete(`/user/likedsong/${songId}`);
      const result = likes.filter((e) => e !== songId);
      setLikes([...result]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.message;
        alert(message);
      }
    }
  };

  return (
    <section className="chart">
      <h2 className="chart-title">인기곡</h2>
      <ol className="chart-list">
        {chartData.map((song, idx) => (
          <li className="chart-item" key={song.id}>
            <div className="chart-item-left">
              <div className="chart-rank">{idx + 1}</div>
              <div className="chart-content">
                <h3 className="chart-content-song">{song.name}</h3>
                <p className="chart-content-artist">{song.artist_name}</p>
              </div>
            </div>
            <div className="chart-button">
              <button
                type="button"
                onClick={() => {
                  handlePlaylist(song.youtube_video_id);
                  handlePlay();
                }}
                className="btn-play btn"
              >
                ▶
              </button>
              {isLoggedIn && likes.includes(song.id) ? (
                <button
                  type="button"
                  onClick={() => delLike(song.id)}
                  className="btn-liked btn"
                >
                  Unlike
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => postLike(song.id)}
                  className="btn-liked btn"
                >
                  Like
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Chart;

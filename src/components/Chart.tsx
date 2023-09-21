import React, { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Song from '../types/song';

export const chartLoader = async () => {
  try {
    const response = await axios.get<Song[]>('/song/chart');
    return response.data;
  } catch (error) {
    throw new Response();
  }
};

const Chart = () => {
  const chartData = useLoaderData() as Song[];
  const isLoggedInData = useOutletContext() as boolean;

  const [likes, setLikes] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/user/info');
        const user = response.data;
        if (user) {
          const likesResponse = await axios.get('/user/likedsongid');
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
            {isLoggedInData && (
              <div className="chart-button">
                {likes.includes(song.id) ? (
                  <button
                    type="button"
                    onClick={() => delLike(song.id)}
                    className="btn-play"
                  >
                    Unlike
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => postLike(song.id)}
                    className="btn-play"
                  >
                    Like
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Chart;

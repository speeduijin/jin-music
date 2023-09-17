import React from 'react';
import Song from '../types/song';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

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
              <button type="button" className="btn-play">
                play
              </button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Chart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from '../types/song';

const Chart = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const isProducrion = process.env.NODE_ENV === 'production';

  const apiUrl = isProducrion
    ? '/song/chart'
    : 'http://localhost:3000/song/chart';

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      setSongs(res.data);
    });
  }, []);

  return (
    <section className="chart">
      <h2 className="chart-title">인기곡</h2>
      <ol className="chart-list">
        {songs.map((song, id) => (
          <li className="chart-item" key={song.id}>
            <div className="chart-item-left">
              <div className="chart-rank">{id + 1}</div>
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

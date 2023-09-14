import React, { useEffect, useState } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';
import Error from '../components/Error';
import Song from '../types/song';

const Chart = () => {
  const [chartData, setChartData] = useState<Song[]>([]);
  const [hasError, setHasError] = useState(false);

  const apiUrl = '/song/chart';

  useEffect(() => {
    (async (url) => {
      try {
        const response = await axios.get<Song[]>(url);

        setChartData(response.data);
      } catch (error) {
        setHasError(true);
      }
    })(apiUrl);
  }, []);

  if (hasError) return <Error />;

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

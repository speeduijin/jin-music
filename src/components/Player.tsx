import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface P {
  playlist: string | string[];
  isPlaying: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

const Player: FC<P> = ({ playlist, isPlaying, handlePlay, handlePause }) => {
  const [playIndex, setPlayIndex] = useState(0);

  let url: string | string[];
  Array.isArray(playlist)
    ? (url = playlist.map((id) => `https://www.youtube.com/watch?v=${id}`))
    : (url = `https://www.youtube.com/watch?v=${playlist}`);

  const active = url !== 'https://www.youtube.com/watch?v=' ? 'active' : '';

  return (
    <>
      <ReactPlayer
        url={url}
        playing={isPlaying}
        loop={true}
        className="iframe"
      />

      <div className={`player-bar ${active}`}>
        <div className="button-group ">
          {isPlaying ? (
            <button type="button" onClick={handlePause} className="btn">
              pause
            </button>
          ) : (
            <button type="button" onClick={handlePlay} className="btn">
              play
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;

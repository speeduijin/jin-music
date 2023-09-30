import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface P {
  playlist: string[];
  isPlaying: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

const Player: FC<P> = ({ playlist, isPlaying, handlePlay, handlePause }) => {
  const [playIndex, setPlayIndex] = useState(0);

  const urls = playlist.map((id, idx) => ({
    index: idx + 1,
    url: `https://www.youtube.com/watch?v=${id}`,
  }));

  const handleNextVideo = (video: string | any[], playIndex: number) => {
    if (playIndex === video.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  const active = urls[0] && 'active';

  return (
    <>
      <ReactPlayer
        url={urls[0] && urls[playIndex].url}
        playing={isPlaying}
        loop={true}
        onEnded={() => {
          handleNextVideo(urls, playIndex);
        }}
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

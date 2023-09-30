import axios from 'axios';
import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Playlist } from '../types';

interface P {
  playlist: Playlist[];
}

const Player: FC<P> = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);

  const urls = playlist.map((song, idx) => ({
    index: idx + 1,
    songId: song.songId,
    url: `https://www.youtube.com/watch?v=${song.youtubeVideoId}`,
  }));

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNextVideo = (video: string | any[], playIndex: number) => {
    if (playIndex === video.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  const patchAddPlaycount = async (songId: number) => {
    try {
      const response = await axios.patch(`/song/${songId}/playcount`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      }
    }
  };

  const active = urls[0] && 'active';

  return (
    <>
      <ReactPlayer
        url={urls[0] && urls[playIndex].url}
        playing={isPlaying}
        loop={true}
        onReady={() => {
          handlePlay();
        }}
        onEnded={() => {
          patchAddPlaycount(urls[playIndex].songId);
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

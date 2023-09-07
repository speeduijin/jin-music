import { FieldPacket } from 'mysql2';
import { promisePool } from '../config/db';
import Song from '../types/song';

const chart = async () => {
  const query = `
  SELECT songs.id,songs.youtube_video_id, songs.name, artists.name AS artist_name
  FROM songs
  LEFT JOIN artists ON songs.artist_id = artists.id
  ORDER BY play_count DESC
  LIMIT 30
`;
  const [rows]: [Song[], FieldPacket[]] = await promisePool.execute(query);
  return rows;
};

const playCount = async (reqYoutueVideoId: string) => {
  if (!reqYoutueVideoId) {
    return 'noYoutueVideoId';
  }

  await promisePool.execute(
    'UPDATE songs SET play_count = play_count + 1 WHERE youtube_video_id = ?',
    [reqYoutueVideoId],
  );

  return 'success';
};

export { chart, playCount };

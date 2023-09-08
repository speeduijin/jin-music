import { FieldPacket } from 'mysql2';
import { promisePool } from '../config/db';
import Song from '../types/song';
import LikedSong from '../types/likedSong';
import User from '../types/user';

const getLikedSong = async (reqUserId: number) => {
  const query = `
    SELECT songs.id, songs.youtube_video_id, songs.name, artists.name AS artist_name
    FROM songs
    LEFT JOIN artists ON songs.artist_id = artists.id
    INNER JOIN liked_song ON songs.id = liked_song.song_id
    WHERE liked_song.user_id = ?
  `;

  const [likedSong]: [Song[], FieldPacket[]] = await promisePool.execute(
    query,
    [reqUserId],
  );

  return likedSong;
};

const postLikedSong = async (reqUserId: number, reqSongId: number) => {
  if (!reqSongId) return 'InvalidReqSongId';

  const [exUser]: [User[], FieldPacket[]] = await promisePool.execute(
    'SELECT * FROM users WHERE id = ?',
    [reqUserId],
  );

  if (exUser) {
    const [exLikedSong]: [LikedSong[], FieldPacket[]] =
      await promisePool.execute(
        'SELECT * FROM liked_song WHERE user_id = ? AND song_id = ?',
        [reqUserId, reqSongId],
      );

    if (exLikedSong.length === 1) return 'alreadyLiked';

    await promisePool.execute(
      'INSERT INTO liked_song (user_id, song_id, created_at) VALUES (?, ?, NOW())',
      [reqUserId, reqSongId],
    );
    return 'success';
  }

  return 'noUser';
};

const delLikedSong = async (reqUserId: number, reqSongId: number) => {
  if (!reqSongId) return 'InvalidReqSongId';

  const [exUser]: [User[], FieldPacket[]] = await promisePool.execute(
    'SELECT * FROM users WHERE id = ?',
    [reqUserId],
  );

  if (exUser) {
    const [exLikedSong]: [LikedSong[], FieldPacket[]] =
      await promisePool.execute(
        'SELECT * FROM liked_song WHERE user_id = ? AND song_id = ?',
        [reqUserId, reqSongId],
      );

    if (exLikedSong.length === 0) return 'notLiked';

    await promisePool.execute(
      'DELETE FROM liked_song WHERE user_id = ? AND song_id = ?',
      [reqUserId, reqSongId],
    );

    return 'delCompleted';
  }

  return 'noUser';
};

export { getLikedSong, postLikedSong, delLikedSong };

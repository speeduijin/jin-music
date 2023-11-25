import { RowDataPacket } from 'mysql2';

export default interface LikedSong extends RowDataPacket {
  user_id: number;
  song_id: number;
  created_at: Date;
}

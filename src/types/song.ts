import { RowDataPacket } from 'mysql2';

export default interface Song extends RowDataPacket {
  id: number;
  youtube_video_id: string;
  name: string;
  play_count: number;
  artist_id: number;
}

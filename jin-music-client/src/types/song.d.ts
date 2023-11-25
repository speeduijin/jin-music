export default interface Song {
  id: number;
  youtube_video_id: string;
  name: string;
  artist_name: Artist.name;
}

interface Artist {
  id: number;
  name: string;
}

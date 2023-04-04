export type Image = {
  url: string;
};

export type Artist = {
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  items: Artist[];
  tracks: Track[];
  followers: Followers;
};

export type Track = {
  id: string;
  images: Image[];
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  track_number: number;
  explicit: boolean;
  release_date: string;
  description: string;
  items: Track[];
  tracks: Track[];
  track: Track;
  added_at: string;
};

export type Album = {
  copyrights: string[];
  total_tracks: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  artists: Artist[];
  items: Album[];
  tracks: Track;
};

export type Playlist = {
  tracks: Track;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  description: string;
  items: Playlist[];
  owner: Owner;
  followers: Followers;
};

export type API = {
  categories: Category;
  albums: Album;
  playlists: Playlist;
  artists: Artist;
  tracks: Track;
  message: string;
};

export type Owner = {
  display_name: string;
};

export type Followers = {
  total: string;
};

export type Token = {
  access_token: string;
};

export type Category = {
  id: string;
  name: string;
  icons: Image[];
  items: Category[];
};

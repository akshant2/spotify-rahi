export type Image = {
  url: string;
};

export type Artist = {
  id: string;
  images: Image[];
  name: string;
  length: number;
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
};

export type Album = {
  id: string;
  images: Image[];
  name: string;
  length: number;
  release_date: string;
  artists: Artist[];
};

export type Playlist = {
  id: string;
  images: Image[];
  name: string;
  length: number;
  release_date: string;

  description: string;
};

export type PlaylistTracks = {
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  track: Track;

  description: string;
};

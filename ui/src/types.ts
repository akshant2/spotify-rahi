export type Artist = {
  id: string;
  images: any;
  name: string;
  length: number;
};

export type Track = {
  id: string;
  images: any;
  name: string;
  artists: any;
  album: any;
  duration_ms: number;
  track_number: number;
  explicit: boolean;
  track: any;

  release_date: string;

  description: string;
};

export type Album = {
  id: string;
  images: any;
  name: string;
  length: number;
  release_date: string;
  artists: any;
};

export type Playlist = {
  id: string;
  images: any;
  name: string;
  length: number;
  release_date: string;

  description: string;
};

export type PlaylistTracks = {
  id: string;
  images: any;
  name: string;
  length: number;
  release_date: string;

  track: any;

  description: string;
};

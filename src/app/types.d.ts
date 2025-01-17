type UserProfileSimple = {
  id: string;
  name: string;
  url: string;
  pictureUrl?: string;
};

type TrackSimple = {
  id: string;
  name: string;
  url?: string;
  pictureUrl?: string;
  artists: ArtistBase[];
};

type ArtistBase = {
  name: string;
  url: string;
};

type ArtistSimple = {
  id: string;
  name: string;
  url: string;
  pictureUrl?: string;
  genres: string[];
};

type PlaylistSimple = {
  id: string;
  name?: string;
  url?: string;
  pictureUrl?: string;
  owner: UserProfileSimple;
  trackCount: number;
};

type ItemSimple =
  | UserProfileSimple
  | TrackSimple
  | ArtistSimple
  | PlaylistSimple;

type TimeRange = 'short-term' | 'medium-term' | 'long-term';

type Endpoint =
  | 'artist/top'
  | 'auth/login'
  | 'auth/refresh'
  | 'track/current'
  | 'track/history'
  | 'track/top'
  | 'playlist'
  | 'playlist/shuffle'
  | ''
  | 'user/profile'
  | 'user/signout';

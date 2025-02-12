interface UserProfileBase {
  name: string;
  url: string;
}

interface UserProfileSimple extends UserProfileBase {
  id: string;
  pictureUrl?: string;
}

interface TrackSimple {
  id: string;
  name: string;
  url: string;
  pictureUrl?: string;
  artists: ArtistBase[];
}

interface ArtistBase {
  name: string;
  url: string;
}

interface ArtistSimple extends ArtistBase {
  id: string;
  pictureUrl?: string;
  genres: string[];
}

interface PlaylistSimple {
  id: string;
  name: string;
  url: string;
  pictureUrl?: string;
  owner: UserProfileBase;
  trackCount: number;
}

interface GenreSimple {
  name: string;
  artistCount: number;
}

type ItemSimple =
  | UserProfileSimple
  | TrackSimple
  | ArtistSimple
  | GenreSimple
  | PlaylistSimple;

type TimeRange = 'short-term' | 'medium-term' | 'long-term';

type Endpoint =
  | 'artist/top'
  | 'auth/login'
  | 'auth/refresh'
  | 'genre/top'
  | 'track/current'
  | 'track/history'
  | 'track/top'
  | 'playlist'
  | 'playlist/shuffle'
  | ''
  | 'user/profile'
  | 'user/signout';

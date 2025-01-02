export const Endpoints = {
  artist: {
    top: 'artist/top',
  },
  auth: {
    login: 'auth/login',
    refresh: 'auth/refresh',
  },
  track: {
    current: 'track/current',
    history: 'track/history',
    top: 'track/top',
  },
  playlist: {
    root: 'playlist',
    shuffle: 'playlist/shuffle',
  },
  root: '',
  user: {
    profile: 'user/profile',
    signout: 'user/signout',
  },
} as const;

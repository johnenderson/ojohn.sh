export type LastfmTrack = {
  name: string;
  artist: string;
  album: string | null;
  url: string;
  imageUrl: string | null;
  nowPlaying: boolean;
  playedAt: string | null;
};

export type LastfmStats = {
  nowPlaying: LastfmTrack | null;
  lastPlayed: LastfmTrack | null;
  tracks: LastfmTrack[];
};

export type LastfmArtist = {
  name: string;
  url: string;
  imageUrl: string | null;
  imageSource: 'spotify' | null;
  spotifyUrl: string | null;
  playcount: number;
};

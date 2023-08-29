type TSpotifyIcon = {
  height?: number
  width?: number
  url: string
}

export interface ISpotifyCategory {
  icon: string
  externalId: string
  name: string
}

export interface IRawSpotifyCategory {
  href: string
  icons: TSpotifyIcon[]
  id: string
  name: string
}

export interface IRawSpotifyPlaylistTrack {
  href: string
  total: number
}

export interface IRawSpotifyPlaylist {
  href: string
  description: string
  id: string
  images: TSpotifyIcon[]
  name: string
  primary_color?: string
  tracks: IRawSpotifyPlaylistTrack
}

export interface ISpotifyPlaylist
  extends Pick<IRawSpotifyPlaylist, 'description' | 'name'> {
  image: string
  tracks: number
  externalId: string
  primaryColor?: string
}

export interface IRawSpotifyAlbum {
  id: string
  images: TSpotifyIcon[]
  name: string
  release_date: string
  total_tracks: number
}

export interface ISpotifyArtist {
  externalId: string
  name: string
}

export interface IRawSpotifyArtist {
  id: string
  name: string
}

export interface IRawSpotifyTrack {
  album: IRawSpotifyAlbum
  artists: IRawSpotifyArtist[]
  duration_ms: number
  id: string
  name: string
}

export interface IRawSpotifyTrackItem {
  primary_color?: string
  track: IRawSpotifyTrack
}

export interface ISpotifyAlbum {
  externalId: string
  image: string
  name: string
  releaseDate: string
  tracks: number
}

export interface ISpotifyTrack {
  album: ISpotifyAlbum
  artists: ISpotifyArtist[]
  duration: number
  externalId: string
  name: string
  primaryColor?: string
}

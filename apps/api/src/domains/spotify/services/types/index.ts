type TSpotifyIcon = {
  height: number | null
  width: number | null
  url: string
}

export interface ISpotifyCategory {
  href: string
  icon: TSpotifyIcon
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
  primary_color: string | null
  tracks: IRawSpotifyPlaylistTrack
}

export interface ISpotifyPlaylist
  extends Pick<IRawSpotifyPlaylist, 'description' | 'name'> {
  image: TSpotifyIcon
  tracks: number
  externalId: string
  primaryColor: string | null
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

export interface IRawSpotifyTrack {
  album: IRawSpotifyAlbum
  artists: ISpotifyArtist[]
  duration_ms: number
  id: string
  name: string
}

export interface IRawSpotifyTrackItem {
  primary_color: string | null
  track: IRawSpotifyTrack
}

export interface ISpotifyAlbum {
  externalId: string
  image: TSpotifyIcon
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
  primaryColor: string | null
}

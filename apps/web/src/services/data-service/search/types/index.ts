export const ESearchTypes = {
  ALBUM: 'album',
  ARTIST: 'artist',
  PLAYLIST: 'playlist',
  TRACK: 'track',
} as const

export type TSearchTypes = (typeof ESearchTypes)[keyof typeof ESearchTypes]

export interface ISearchParams {
  query: string
  type: TSearchTypes
}

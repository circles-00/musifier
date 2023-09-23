export interface IArtist {
  id: number
  name: string
}

export interface ITrack {
  duration: number
  id: number
  name: string
  image: string
  artists: IArtist[]
}

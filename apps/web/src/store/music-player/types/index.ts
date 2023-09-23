export interface IMusicPlayerActions {
  setCurrentTrackId: (id: number) => void
  setSeekTime: (time: number) => void
  setIsPlaying: (isPlaying: boolean) => void
}

export interface IMusicPlayerState {
  musicPlayerActions: IMusicPlayerActions
  currentTrackId?: number
  seekTime: number
  isPlaying: boolean
}

export type TMusicPlayerSlice = IMusicPlayerState

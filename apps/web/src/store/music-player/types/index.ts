export interface IMusicPlayerActions {
  setCurrentTrackId: (id: number) => void
  setSeekTime: (time: number) => void
}

export interface IMusicPlayerState {
  musicPlayerActions: IMusicPlayerActions
  currentTrackId?: number
  seekTime: number
}

export type TMusicPlayerSlice = IMusicPlayerState

export interface IMusicPlayerActions {
  setCurrentTrackId: (id?: number) => void
  setSeekTime: (time: number) => void
  setQueue: (queue: number[]) => void
}

export interface IMusicPlayerState {
  musicPlayerActions: IMusicPlayerActions
  currentTrackId?: number
  seekTime: number
  queue: number[]
}

export type TMusicPlayerSlice = IMusicPlayerState

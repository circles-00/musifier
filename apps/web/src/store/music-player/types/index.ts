export interface IMusicPlayerActions {
  setCurrentTrackId: (id: number) => void
  setSeekTime: (time: number) => void
  setIsMiniPlayerVisible: (isVisible: boolean) => void
}

export interface IMusicPlayerState {
  musicPlayerActions: IMusicPlayerActions
  currentTrackId?: number
  seekTime: number
  isMiniPlayerVisible: boolean
}

export type TMusicPlayerSlice = IMusicPlayerState

export interface IUseMusicPlayer {
  src: string
}

export const EPlayingModes = ['none', 'repeat', 'repeat-one'] as const

export type TPlayingMode = (typeof EPlayingModes)[number]

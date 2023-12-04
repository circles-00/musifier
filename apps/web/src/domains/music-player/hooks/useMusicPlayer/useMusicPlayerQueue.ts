import {
  useMusicPlayerActions,
  useMusicPlayerCurrentTrackId,
  useMusicPlayerQueue as useStoreMusicPlayerQueue,
} from '@/hooks'
import { useCallback } from 'react'

export const useMusicPlayerQueue = () => {
  const queue = useStoreMusicPlayerQueue()
  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { setQueue } = useMusicPlayerActions()

  const initializeQueue = useCallback(
    (tracks: number[]) => {
      setQueue(tracks)
    },
    [setQueue],
  )

  const addTrackToQueue = useCallback(
    (trackId: number) => {
      setQueue([...queue, trackId])
    },
    [queue, setQueue],
  )

  const removeTrackFromQueue = useCallback(
    (trackId: number) => {
      setQueue(queue.filter((id) => id !== trackId))
    },
    [queue, setQueue],
  )

  const moveTrackInQueue = useCallback(
    (trackId: number, position: number) => {
      const newQueue = [...queue]
      const index = newQueue.indexOf(trackId)
      newQueue.splice(index, 1)
      newQueue.splice(position, 0, trackId)

      setQueue(newQueue)
    },
    [queue, setQueue],
  )

  const clearQueue = useCallback(() => {
    setQueue([])
  }, [setQueue])

  const getCurrentTrackPosition = useCallback(() => {
    if (!currentTrackId) {
      return -1
    }

    return queue.indexOf(currentTrackId)
  }, [currentTrackId, queue])

  const getNextTrack = useCallback(() => {
    const currentTrackIndex = getCurrentTrackPosition()

    if (currentTrackIndex === -1) {
      return undefined
    }

    const nextTrackIndex = currentTrackIndex + 1

    if (nextTrackIndex >= queue.length) {
      return 0
    }

    return queue[nextTrackIndex]
  }, [getCurrentTrackPosition, queue])

  const getPreviousTrack = useCallback(() => {
    const currentTrackIndex = getCurrentTrackPosition()

    if (currentTrackIndex === -1) {
      return undefined
    }

    const previousTrackIndex = currentTrackIndex - 1

    if (previousTrackIndex < 0) {
      return queue.length - 1
    }

    return queue[previousTrackIndex]
  }, [getCurrentTrackPosition, queue])

  return {
    queue,
    initializeQueue,
    addTrackToQueue,
    removeTrackFromQueue,
    moveTrackInQueue,
    clearQueue,
    getCurrentTrackPosition,
    getNextTrack,
    getPreviousTrack,
  }
}

import { useMemo } from 'react'
import { useIsBrowser } from '../useIsBrowser'

export const useAudioContext = () => {
  const isBrowser = useIsBrowser()

  const audioContext = useMemo(() => {
    if (!isBrowser) {
      return null
    }

    return new AudioContext()
  }, [isBrowser])

  return { audioContext }
}

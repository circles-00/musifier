import { useMemo } from 'react'
import { useIsBrowser } from '../useIsBrowser'

export const useAudioContext = () => {
  const isBrowser = useIsBrowser()

  const audioContext = useMemo(() => {
    if (!isBrowser) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (window.AudioContext || (window as any).webkitAudioContext)()
  }, [isBrowser])

  return { audioContext }
}

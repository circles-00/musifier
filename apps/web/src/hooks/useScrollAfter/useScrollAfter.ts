import { TVoidFunction } from '@/types'
import { useEffect, useRef } from 'react'

export const useScrollAfter = (
  scrollAfterMultiplyFactor: number,
  callback: TVoidFunction,
) => {
  const canScroll = useRef(false)

  useEffect(() => {
    window.onscroll = () => {
      const scrollHeight =
        (document.body.scrollHeight - document.documentElement.clientHeight) *
        scrollAfterMultiplyFactor

      if (window.scrollY >= scrollHeight && canScroll.current) {
        canScroll.current = false
        callback()
      }

      if (window.scrollY < scrollHeight) {
        canScroll.current = true
      }
    }
  }, [callback, scrollAfterMultiplyFactor])

  return null
}

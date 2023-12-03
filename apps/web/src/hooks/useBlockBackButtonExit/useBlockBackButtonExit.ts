import { useEffect } from 'react'

export const useBlockBackButtonExit = () => {
  useEffect(() => {
    window.addEventListener('load', function () {
      window.history.pushState({}, '')
    })

    window.addEventListener('popstate', function () {
      window.history.pushState({}, '')
    })
  }, [])
}

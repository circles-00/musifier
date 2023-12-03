import { useCallback } from 'react'
import { NavigateOptions, useNavigate } from 'react-router-dom'

export const useReactRouterNavigate = () => {
  const reactRouterNavigate = useNavigate()

  const navigate = useCallback(
    (to: string | number, navigateOptions?: NavigateOptions) => {
      if (typeof to === 'number') {
        reactRouterNavigate(-1)
        window.history.back()
        return
      }

      reactRouterNavigate(to, navigateOptions)
      window.history.pushState(null, '', to)
    },
    [reactRouterNavigate],
  )

  return navigate
}

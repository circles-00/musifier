import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSyncNavigation = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const popstateListener = () => {
      navigate(window.location.pathname)
    }

    window.addEventListener('popstate', popstateListener)

    return () => {
      window.removeEventListener('popstate', popstateListener)
    }
  }, [navigate])
}

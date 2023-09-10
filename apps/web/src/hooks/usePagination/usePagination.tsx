import { useCallback, useState } from 'react'

export const usePagination = () => {
  const [pageParam, setPageParam] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const incrementPage = useCallback(() => setPageParam((prev) => prev + 1), [])

  return {
    pageParam,
    pageSize,
    incrementPage,
    setPageSize,
    setPageParam,
  }
}

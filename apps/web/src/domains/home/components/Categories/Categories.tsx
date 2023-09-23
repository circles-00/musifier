import { usePagination, useScrollAfter } from '@/hooks'
import { DataService } from '@/services'
import { useInfiniteQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { CardList } from '../CardList'
import { ICategories } from './types'

export const Categories: FC<ICategories> = () => {
  const { pageSize } = usePagination()

  const { data, fetchNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) =>
      DataService.getCategoriesWithPlaylists({ pageSize, pageParam }),
    queryKey: DataService.getCategoriesWithPlaylists.queryKey({ pageSize }),
    getNextPageParam: (lastPage) => lastPage.metaData.nextPage ?? undefined,
  })

  useScrollAfter(0.2, fetchNextPage)

  return (
    <>
      {data?.pages
        ?.flatMap(({ data: pageData }) => pageData)
        ?.filter(({ playlists }) => playlists.length)
        .map(({ name: categoryName, playlists, id: categoryId }) => (
          <CardList
            key={categoryId}
            title={categoryName}
            cards={playlists.map(({ id, name, description, image }) => ({
              id,
              title: name,
              caption: description,
              image,
              href: `/playlist?id=${id}`,
            }))}
          />
        ))}
    </>
  )
}

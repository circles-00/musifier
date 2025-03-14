import { Avatar } from '@/components'
import { useMusicPlayerContext } from '@/domains/music-player'
import { useCacheSearchResults } from '@/domains/search'
import { TracksList } from '@/domains/tracks/components/TracksList'
import { FormInput } from '@/form-fields'
import { useDebounce } from '@/hooks'
import { DataService } from '@/services'
import { ITrack } from '@/services/data-service'
import { TSearchTypes } from '@/services/data-service/search/types'
import { ISearchResult } from '@/store/search'
import { formResolver } from '@/utils'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

const validationSchema = z.object({
  search: z.string().min(1),
})

type TValidationSchema = z.infer<typeof validationSchema>

const SearchPage = () => {
  const methods = useForm<TValidationSchema>({
    resolver: formResolver(validationSchema),
    defaultValues: {
      search: '',
    },
  })

  const searchValue = useWatch({ control: methods.control, name: 'search' })
  const debouncedSearchValue = useDebounce(searchValue, 200)

  // Note: Feature is not fully ready on backend, so disable the buttons for now
  const typesFilters = useMemo(
    () => [
      {
        name: 'Songs',
        type: 'track',
      },
      {
        name: 'Artists',
        type: 'artist',
        disabled: true,
      },
      {
        name: 'Albums',
        type: 'album',
        disabled: true,
      },
      {
        name: 'Playlists',
        type: 'playlist',
        disabled: true,
      },
    ],
    [],
  )

  const [selectedTypeFilter, setSelectedTypeFilter] = useState(typesFilters[0])

  const { data, isLoading } = useQuery({
    queryFn: () =>
      DataService.search({
        query: debouncedSearchValue,
        type: selectedTypeFilter.type as TSearchTypes,
      }),
    queryKey: DataService.search.queryKey({
      query: debouncedSearchValue,
      type: selectedTypeFilter.type as TSearchTypes,
    }),
    keepPreviousData: true,
  })
  const { searchResults } = useCacheSearchResults()
  const { initializeQueue } = useMusicPlayerContext()

  const onTrackClick = useCallback(
    (searchResult: ISearchResult) => {
      initializeQueue([searchResult.content.id])
    },
    [initializeQueue],
  )

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar name="NN" />
          <p className="text-2xl">Search</p>
        </div>
        <FormInput
          name="search"
          placeholder="What do you want to listen to?"
          iconLeft={<MagnifyingGlassIcon className="h-6 w-6 text-black" />}
        />
        <div className="no-scrollbar flex justify-between overflow-x-scroll">
          {typesFilters.map(({ name, type, disabled }) => (
            <button
              disabled={disabled}
              key={type}
              className={`rounded-md border border-gray-300 px-2 py-2 ${
                selectedTypeFilter?.type === type
                  ? 'border-none bg-sky-500'
                  : 'bg-none'
              } ${disabled ? 'opacity-50' : ''}
              }`}
              onClick={() => setSelectedTypeFilter({ name, type })}
            >
              {name}
            </button>
          ))}
        </div>
        {data && data?.length > 0 ? (
          <TracksList cacheTrack tracks={data} onTrackClick={onTrackClick} />
        ) : searchResults.length > 0 && !isLoading ? (
          <TracksList
            type="search"
            onTrackClick={onTrackClick}
            tracks={
              searchResults?.map(({ content }) => content as ITrack) ?? []
            }
          />
        ) : (
          <div className="mt-64 flex items-center justify-center">
            <p className="text-2xl">Start typing...</p>
          </div>
        )}
      </div>
    </FormProvider>
  )
}

export default SearchPage

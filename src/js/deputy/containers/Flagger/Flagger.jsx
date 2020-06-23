import React, { useCallback, useEffect, useState, useRef } from 'react'
import Tools from '@deputy/components/Tools/Tools'
import { searchVideos, getParamsSearchVideos } from '@deputy/helpers/api'
import useQuery from '@deputy/hooks/use-query'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'
import { serializeForm } from '@utils/index'
import './flagger.scoped.scss'

function Flagger({ history }) {
  const query = useQuery()
  const searchQuery = query.get('search_query')
  const filters = query.get('filters')
  const excludeFlaggedVideos = query.get('exclude_flagged_videos')
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(!!searchQuery)
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [canFlag, setCanFlag] = useState(false)
  const currentParams = useRef(null)
  const scrollerRef = useRef(null)
  const form = useRef(null)

  const fetchSearchVideos = useCallback(async params => {
    try {
      setIsLoading(true)
      const searchParams = getParamsSearchVideos(params)
      const response = await searchVideos(searchParams)
      setHasMore(response.hasMore)
      currentParams.current = { ...params, page: params.page + 1 }
      setVideos(prevState => [...prevState, ...response.videos])
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    setVideos([])
    if (searchQuery) {
      fetchSearchVideos({
        page: 1,
        searchQuery: searchQuery,
        filters: filters,
        excludeFlaggedVideos: excludeFlaggedVideos
      })
    }
  }, [fetchSearchVideos, searchQuery, filters, excludeFlaggedVideos])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && hasMore && !isError) {
      fetchSearchVideos(currentParams.current)
    }
  }, [fetchSearchVideos, isLoading, isError, hasMore])

  const handleSubmit = useCallback(
    (...params) => {
      const searchParamsString = `?${getParamsSearchVideos(...params)}`
      history.replace({
        pathname: '/deputy',
        search: searchParamsString
      })
    },
    [history]
  )

  const handleFlag = useCallback(() => {
    const formValue = serializeForm(form.current)
    console.log({ formValue })
  }, [])

  return (
    <div className="flagger">
      <Tools onSubmit={handleSubmit} onFlag={handleFlag} canFlag={canFlag} />
      <div
        className={`flagger-list-container ${isLoading && videos.length === 0 ? 'flagger-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'flagger-list-container-empty' : ''
        }`}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {isLoading && videos.length === 0 ? (
          <Loader />
        ) : (
          <form
            ref={form}
            id="form-flagger"
            onChange={() => {
              const formValue = serializeForm(form.current)
              setCanFlag(Object.keys(formValue).length > 0)
            }}
          >
            <VideoList videos={videos} />
          </form>
        )}
        {isLoading && videos.length > 0 && <Loader spinner />}
        {!isLoading && videos.length === 0 && <p>No result</p>}
        {!isLoading && videos.length > 0 && !hasMore && <p>No more result</p>}
      </div>
    </div>
  )
}

export default Flagger
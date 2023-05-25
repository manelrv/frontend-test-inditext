import { Podcast } from '../../infrastructure/types/types'
import { useState, useEffect, ChangeEvent } from 'react'
import usePodcasts from '../usePodcasts'

const useFilter = () => {
  const [filter, setFilter] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Podcast[]>([])
  const { podcasts } = usePodcasts()

  useEffect(() => {
    setFilteredData(podcasts)
  }, [podcasts])

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilter(value)
  }

  useEffect(() => {
    if (podcasts.length === 0) return
    const lowerCaseFilter = filter.toLowerCase()
    const newFilteredData = podcasts.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(lowerCaseFilter) ||
        podcast.artist.toLowerCase().includes(lowerCaseFilter)
    )
    setFilteredData(newFilteredData)
  }, [filter, podcasts])

  const resetFilter = () => {
    setFilter('')
  }

  return { filter, podcasts: filteredData, handleFilter, resetFilter }
}

export default useFilter

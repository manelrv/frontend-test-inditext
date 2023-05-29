import { Podcast } from '../../infrastructure/types/types'
import { useState, useEffect, ChangeEvent } from 'react'
import usePodcasts from '../usePodcasts'

/**
 * This is a custom hook in TypeScript that filters a list of podcasts based on user input and returns the filtered list
 * along with functions to handle the filter and reset it.
 * @returns The `useFilter` custom hook is returning an object with the following properties:
 */
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

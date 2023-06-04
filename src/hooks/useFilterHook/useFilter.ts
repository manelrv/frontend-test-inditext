import {Podcast, UseFilterResult} from '../../infrastructure/types/types'
import { useState, useEffect, ChangeEvent } from 'react'
import usePodcasts from '../usePodcastsHook/usePodcasts'

/**
 * This is a custom hook in TypeScript that filters a list of podcasts based on user input and returns the filtered list
 * along with functions to handle the filter and reset it.
 * @returns The `useFilter` custom hook is returning an object with the following properties:
 */
const useFilter = () :UseFilterResult => {
  const [filter, setFilter] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Podcast[]>([])
  const { podcasts } = usePodcasts()

  /* This `useEffect` hook is responsible for initializing the `filteredData` state with the `podcasts` data when the
  component mounts or when the `podcasts` state changes. It runs only once when the component mounts or when the
  `podcasts` state changes. */
  useEffect(() => {
    setFilteredData(podcasts)
  }, [podcasts])

  /**
   * This function handles the change event of an input element and sets the filter value.
   * @param e - The parameter `e` is of type `ChangeEvent<HTMLInputElement>`. It represents the event object that is
   * triggered when the value of an input element of type `input` or `textarea` is changed.
   */
  const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target || e.target.value === ' ') return
    const { value } = e.target
    setFilter(value)
  }

  /* This `useEffect` hook is responsible for filtering the `podcasts` data based on the `filter` state whenever either the
  `filter` or `podcasts` state changes. It first checks if the `podcasts` array has any length, and if not, it returns
  early. Then it converts the `filter` state to lowercase and splits it into an array of keywords. It filters the
  `podcasts` array based on whether every keyword is included in either the `name` or `artist` property of the podcast
  object. Finally, it sets the `filteredData` state to the new filtered array. */
  useEffect(() => {
    if (!podcasts?.length) return
    const lowerCaseFilter = filter.toLowerCase()
    const keywords = lowerCaseFilter.split(' ').filter(keyword => keyword.length > 0);
    const newFilteredData = podcasts.filter(podcast => {
      const podcastName = podcast.name.toLowerCase();
      const podcastArtist = podcast.artist.toLowerCase();

      return keywords.every(keyword =>
          podcastName.includes(keyword) || podcastArtist.includes(keyword)
      );
    });

    setFilteredData(newFilteredData)
  }, [filter, podcasts])

  /**
   * The function `resetFilter` sets the filter to an empty string.
   */
  const resetFilter = () => {
    setFilter('')
  }

  return {
    filter,
    podcasts: filteredData,
    handleFilter,
    resetFilter,
    setFilteredData
  }
}

export default useFilter

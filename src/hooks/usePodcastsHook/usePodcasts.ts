import { useEffect } from 'react'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore/podcasts'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore/fecthStatus'
import axios from 'axios'
import { DELAY_IN_HOURS_REFRESH_ALL_PODCASTS } from '../../infrastructure/constants/constants'
import { getPodcasts } from '../../infrastructure/services/podcasts/getPodcasts/getPodcasts'
import {Podcast, UsePodcastsResult} from "../../infrastructure/types/types";

/**
 * This function retrieves and returns a list of podcasts and a function to get a specific podcast by its ID.
 * @returns The `usePodcasts` custom hook is being returned, which returns an object containing the `podcasts` array and a
 * function `getPodcastById` that takes an `id` parameter and returns the podcast object with the matching `podcastId`.
 */
const usePodcasts = (): UsePodcastsResult => {
  const { podcasts, setPodcasts, timestamp, setTimestamp } = usePodcastsStore()
  const { setLoading } = useFetchStatusStore()

  /* This `useEffect` hook is responsible for fetching the list of podcasts and updating the state of the `podcasts` array
  in the `usePodcastsStore` store. It also sets a timestamp to keep track of when the podcasts were last fetched. */
  useEffect(() => {
    if (
      podcasts?.length &&
      checkElapsedTime({
        timestamp,
        delayInHours: DELAY_IN_HOURS_REFRESH_ALL_PODCASTS
      })
    ) {
      return
    }
    const now = Date.now()
    const source = axios.CancelToken.source()

    const fetchPodcasts = async () => {
      setLoading(true)
      setPodcasts([])
      const newpodcasts = await getPodcasts({ cancelToken: source.token })
      setPodcasts(newpodcasts || [] as Podcast[])
      setTimestamp(now)
      setLoading(false)
    }
    fetchPodcasts()
    return () => {
      source.cancel('Podcasts request cancelled')
      setLoading(false)
    }
  }, [])

  /**
   * This function returns a podcast object from an array of podcasts based on a given ID.
   * @param {string} id - The `id` parameter is a string representing the unique identifier of a podcast. The function
   * `getPodcastById` takes this `id` as input and returns the podcast object from an array of podcasts that matches the
   * given `id`.
   * @returns The function `getPodcastById` is returning a single podcast object from an array of podcasts, where the
   * `podcastId` property of the podcast object matches the `id` parameter passed to the function.
   */
  const getPodcastById = (id: string) => {
    return podcasts.find((podcast) => podcast.podcastId === id)
  }

  return { podcasts, getPodcastById }
}

export default usePodcasts

import { useEffect, useState } from 'react'
import usePodcastsDetailsStore from '../../infrastructure/stores/podcastsDetailsStore/podcastsDetails'
import {PodcastDetails, UsePodcastsDetailsResult} from '../../infrastructure/types/types'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore/fecthStatus'
import axios from 'axios'
import { DELAY_IN_HOURS_REFRESH_PODCAST_DETAILS } from '../../infrastructure/constants/constants'
import { getPodcastDetailsById } from '../../infrastructure/services/podcasts/getPodcastDetailsById/getPodcastDetailsById'

/**
 * This is a custom hook in TypeScript that fetches and stores podcast details and episodes, and provides a function to
 * retrieve a specific episode by its ID.
 * @param {string} [podcastId] - The `podcastId` parameter is an optional string that represents the unique identifier of a
 * podcast. It is used to fetch and store the details of a specific podcast, as well as to retrieve a specific episode
 * within that podcast.
 * @returns The `usePodcastsDetails` custom hook is returning an object with the following properties:
 */
const usePodcastsDetails = (podcastId?: string): UsePodcastsDetailsResult => {
  const { podcastsDetails, setPodcastsDetails } = usePodcastsDetailsStore()
  const [currentPodcastDetails, setCurrentPodcastDetails] =
    useState<PodcastDetails>({} as PodcastDetails)
  const { setLoading } = useFetchStatusStore()

  /* The `useEffect` hook is used to fetch and store podcast details when the `podcastId` prop changes. It first checks if
  the podcast details are already stored in the `podcastsDetails` array, and if they are, it checks if they are still
  current based on a specified delay. If the details are current, it sets the current podcast details to the stored
  details. If the details are not current, it fetches the details using the `getPodcastDetailsById` function and sets
  the current podcast details to the fetched details. It also updates the `podcastsDetails` array with the new details.
  The `useEffect` hook returns a cleanup function that cancels the request and sets the loading state to false. */
  useEffect(() => {
    const fetchPodcastDetails = async ({
      prevPodcastsDetails
    }: {
      prevPodcastsDetails: PodcastDetails[]
    }) => {
      setLoading(true)
      const podcastDetails = await getPodcastDetailsById({
        podcastId: podcastId as string,
        cancelToken: source.token
      })
      setLoading(false)
      if (!podcastDetails) return

      setCurrentPodcastDetails(podcastDetails)
      setPodcastsDetails([...prevPodcastsDetails, podcastDetails])
    }

    if (!podcastId) return

    const storedDetails = podcastsDetails.find(
      (podcast) => podcast.podcastId === podcastId
    )

    const arePodcastDetailsCurrent = checkElapsedTime({
      timestamp: storedDetails?.timestamp ?? 0,
      delayInHours: DELAY_IN_HOURS_REFRESH_PODCAST_DETAILS
    })

    if (arePodcastDetailsCurrent) {
      setCurrentPodcastDetails(storedDetails ?? ({} as PodcastDetails))
      return
    }

    const source = axios.CancelToken.source()

    fetchPodcastDetails({
      prevPodcastsDetails: arePodcastDetailsCurrent
        ? podcastsDetails
        : podcastsDetails.filter((podcast) => podcast.podcastId !== podcastId)
    })

    return () => {
      source.cancel('Podcast details request cancelled')
      setLoading(false)
    }
  }, [podcastId])

  /**
   * This function retrieves a specific episode by its ID within a given podcast.
   * @param  - The function `getEpisodeByPodcastAndEpisodeId` takes in an object with two properties: `podcastId` and
   * `episodeId`. Both properties are of type `string`. The function uses these parameters to find a specific episode
   * within a podcast.
   * @returns The function `getEpisodeByPodcastAndEpisodeId` returns the episode object that matches the given `podcastId`
   * and `episodeId`. If there is no matching podcast or episode, it returns `undefined`.
   */
  const getEpisodeByPodcastAndEpisodeId = ({
    podcastId,
    episodeId
  }: {
    podcastId: string
    episodeId: string
  }) => {
    const podcast = podcastsDetails.find(
      (podcast) => podcast.podcastId === podcastId
    )
    if (!podcast) return
    return podcast.episodes.find((episode) => episode.episodeId === episodeId)
  }

  return {
    currentPodcastDetails,
    numberOfEpisodes: currentPodcastDetails?.episodes?.length ?? 0,
    getEpisodeByPodcastAndEpisodeId
  }
}

export default usePodcastsDetails

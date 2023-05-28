import { useEffect, useState } from 'react'
import usePodcastsDetailsStore from '../../infrastructure/stores/podcastsDetailsStore'
import { PodcastDetails } from '../../infrastructure/types/types'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import axios from 'axios'
import { DELAY_IN_HOURS_REFRESH_PODCAST_DETAILS } from '../../infrastructure/constants/constants'
import { getPodcastDetailsById } from '../../infrastructure/services/podcasts/getPodcastDetailsById/getPodcastDetailsById'

const usePodcastsDetails = (podcastId?: string) => {
  const { podcastsDetails, setPodcastsDetails } = usePodcastsDetailsStore()
  const [currentPodcastDetails, setCurrentPodcastDetails] =
    useState<PodcastDetails>({} as PodcastDetails)
  const { setLoading } = useFetchStatusStore()

  /* This is a custom hook called `usePodcastsDetails` that takes in an optional `podcastId` parameter. It uses the
  `useEffect` hook to fetch podcast details by calling the `getPodcastDetailsById` function from a service file. */
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

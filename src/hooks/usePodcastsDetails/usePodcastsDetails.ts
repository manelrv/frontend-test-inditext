import { getPodcastDetailsById } from '../../infrastructure/services/podcasts/podcasts'
import { useEffect, useState } from 'react'
import usePodcastsDetailsStore from '../../infrastructure/stores/podcastsDetailsStore'
import { PodcastDetails } from '../../infrastructure/types/types'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import axios from 'axios'

const usePodcastsDetails = (podcastId?: string) => {
  const { podcastsDetails, setPodcastsDetails } = usePodcastsDetailsStore()
  const [currentPodcastDetails, setCurrentPodcastDetails] =
    useState<PodcastDetails>({} as PodcastDetails)
  const { setLoading } = useFetchStatusStore()

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchPodcastDetails = async () => {
      if (!podcastId) return
      const storedDetails = podcastsDetails.find(
        (podcast) => podcast.podcastId === podcastId
      )

      if (storedDetails && checkElapsedTime(storedDetails.timestamp)) {
        setCurrentPodcastDetails(storedDetails)
        return
      }

      setLoading(true)
      const podcastDetails = await getPodcastDetailsById({
        podcastId: podcastId as string,
        cancelToken: source.token
      })
      setLoading(false)
      if (!podcastDetails) return

      setCurrentPodcastDetails(podcastDetails)
      setPodcastsDetails([...podcastsDetails, podcastDetails])
    }
    fetchPodcastDetails()
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

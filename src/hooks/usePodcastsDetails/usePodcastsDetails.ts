import { getPodcastDetailsById } from '../../infrastructure/services/podcasts/podcasts'
import { useEffect, useState } from 'react'
import usePodcastsDetailsStore from '../../infrastructure/stores/podcastsDetailsStore'
import { PodcastDetails } from '../../infrastructure/types/types'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

const usePodcastsDetails = (podcastId: string) => {
  const { podcastsDetails, setPodcastsDetails } = usePodcastsDetailsStore()
  const [currentPodcastDetails, setCurrentPodcastDetails] =
    useState<PodcastDetails>({} as PodcastDetails)
  const { setLoading } = useFetchStatusStore()

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      const storedDetails = podcastsDetails.find(
        (podcast) => podcast.podcastId === podcastId
      )

      if (storedDetails && checkElapsedTime(storedDetails.timestamp)) {
        setCurrentPodcastDetails(storedDetails)
        return
      }

      setLoading(true)
      const podcastDetails = await getPodcastDetailsById(podcastId)
      setLoading(false)
      if (!podcastDetails) return

      setCurrentPodcastDetails(podcastDetails)
      setPodcastsDetails([...podcastsDetails, podcastDetails])
    }
    fetchPodcastDetails()
  }, [podcastId])

  return {
    currentPodcastDetails,
    numberOfEpisodes: currentPodcastDetails?.episodes?.length ?? 0
  }
}

export default usePodcastsDetails

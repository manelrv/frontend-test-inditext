import { getPodcastDetailsById } from '../../infrastructure/services/podcasts/podcasts'
import { useEffect, useState } from 'react'
import usePodcastsDetailsStore from '../../infrastructure/stores/podcastsDetailsStore'
import { PodcastDetails } from '../../infrastructure/types/types'
import checkElapsedTime from '../../infrastructure/helpers/checkElapsedTime'

const usePodcastsDetails = (podcastId: string) => {
  const { podcastsDetails, setPodcastsDetails } = usePodcastsDetailsStore()
  const [currentPodcastDetails, setCurrentPodcastDetails] =
    useState<PodcastDetails>({} as PodcastDetails)

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      const storedDetails = podcastsDetails.find(
        (podcast) => podcast.id === podcastId
      )

      if (storedDetails && checkElapsedTime(storedDetails.timestamp)) {
        setCurrentPodcastDetails(storedDetails)
        return
      }

      console.log({ podcastId })
      const podcastDetails = await getPodcastDetailsById(podcastId)
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

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PodcastDetails } from '../../types/types'

interface IPodcastsDetails {
  podcastsDetails: PodcastDetails[]
  setPodcastsDetails: (details: PodcastDetails[]) => void
}

const usePodcastsDetailsStore = create<IPodcastsDetails>()(
  persist(
    (set) => ({
      podcastsDetails: [] as PodcastDetails[],
      setPodcastsDetails: (podcastsDetails: PodcastDetails[]) =>
        set({ podcastsDetails })
    }),
    {
      name: 'podcasts-details-store'
    }
  )
)

export default usePodcastsDetailsStore

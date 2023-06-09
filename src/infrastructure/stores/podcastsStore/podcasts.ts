import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Podcast } from '../../types/types'

interface Podcasts {
  podcasts: Podcast[]
  timestamp: number
  setPodcasts: (podcasts: Podcast[]) => void
  setTimestamp: (timestamp: number) => void
}

const usePodcastsStore = create<Podcasts>()(
  persist(
    (set) => ({
      podcasts: [] as Podcast[],
      timestamp: Date.now(),
      setPodcasts: (podcasts: Podcast[]) => set({ podcasts }),
      setTimestamp: (timestamp: number) => set({ timestamp })
    }),
    {
      name: 'podcasts-store'
    }
  )
)

export default usePodcastsStore

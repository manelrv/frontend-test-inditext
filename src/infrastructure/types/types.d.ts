export interface Podcast {
  podcastId: string
  name: string
  image: string
  artist: string
  description: string
}

export type PodcastSummaryType = Omit<Podcast, 'description'>

export interface PodcastEpisode {
  episodeId: string
  title: string
  date: string
  duration: string
  description: string
  streamUrl: string
}
export interface PodcastDetails {
  podcastId: string
  timestamp: number
  episodes: PodcastEpisode[]
}

export type PodcastEpisodeRow = Omit<
  PodcastEpisode,
  'description' | 'streamUrl'
>

export type UseFilterResult = {
  filter: string
  podcasts: Podcast[]
  // eslint-disable-next-line no-unused-vars
  handleFilter: (e: ChangeEvent<HTMLInputElement>) => void
  resetFilter: () => void
  setFilteredData: React.Dispatch<React.SetStateAction<Podcast[]>>
}


export type UsePodcastsResult = {
  podcasts: Podcast[]
  // eslint-disable-next-line no-unused-vars
  getPodcastById: (id: string) => Podcast | undefined
}

export type UsePodcastsDetailsResult = {
  currentPodcastDetails: PodcastDetails
  numberOfEpisodes: number
  // eslint-disable-next-line no-unused-vars
  getEpisodeByPodcastAndEpisodeId: (params: {
    podcastId: string
    episodeId: string
  }) => Episode | undefined
}
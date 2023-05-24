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

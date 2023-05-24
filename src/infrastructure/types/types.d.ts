export interface Podcast {
  id: string
  name: string
  image: string
  artist: string
  description: string
}

export type PodcastSummaryType = Omit<Podcast, 'description'>

export interface PodcastEpisode {
  title: string
  date: string
  duration: string
  description: string
  streamUrl: string
}
export interface PodcastDetails {
  id: string
  timestamp: number
  episodes: PodcastEpisode[]
}

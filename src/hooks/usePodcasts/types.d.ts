export interface Podcast {
  id: string
  name: string
  image: string
  artist: string
  description: string
}

export type PodcastSummaryType = Omit<Podcast, 'description'>

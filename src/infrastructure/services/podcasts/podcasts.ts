import { Podcast, PodcastDetails, PodcastEpisode } from '../../types/types'
import axios from 'axios'
import { convertMillisecondsToHHMMSS } from '../../helpers/convertMillisecondsToHHMMSS'

export const getPodcasts = async () => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )}`
  )
  const contents = await JSON.parse(response.data.contents)
  const rawPodcasts = contents.feed.entry
  return rawPodcasts.map((podcast: any) => {
    return {
      id: podcast.id.attributes['im:id'],
      name: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      artist: podcast['im:artist'].label,
      description: podcast.summary.label
    } as Podcast
  })
}

export const getPodcastDetailsById = async (id: string) => {
  console.log({ id })
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast &entity=podcastEpisode`
    )}`
  )
  const contents = await JSON.parse(response.data.contents)
  const episodes: PodcastEpisode[] = contents.results.map((podcast: any) => {
    return {
      title: podcast.trackName,
      date: podcast.releaseDate,
      duration: convertMillisecondsToHHMMSS(podcast.trackTimeMillis),
      description: podcast.description,
      streamUrl: podcast.previewUrl
    }
  })
  const podcastDetailsData: PodcastDetails = {
    id,
    timestamp: Date.now(),
    episodes
  }
  console.log({ podcastDetailsData, results: contents.results })
  return podcastDetailsData
}

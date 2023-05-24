import { Podcast, PodcastDetails, PodcastEpisode } from '../../types/types'
import axios, { CancelToken } from 'axios'
import { convertMillisecondsToHHMMSS } from '../../utils/convertMillisecondsToHHMMSS'

export const getPodcasts = async ({
  cancelToken
}: {
  cancelToken: CancelToken
}) => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )}`,
    { cancelToken }
  )
  const contents = await JSON.parse(response.data.contents)
  const rawPodcasts = contents.feed.entry
  return rawPodcasts.map((podcast: any) => {
    return {
      podcastId: podcast.id.attributes['im:id'],
      name: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      artist: podcast['im:artist'].label,
      description: podcast.summary.label
    } as Podcast
  })
}

export const getPodcastDetailsById = async ({
  podcastId,
  cancelToken
}: {
  podcastId: string
  cancelToken: CancelToken
}) => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode`
    )}`,
    { cancelToken }
  )
  const contents = await JSON.parse(response.data.contents)
  const episodes: PodcastEpisode[] = contents.results.map((podcast: any) => {
    return {
      episodeId: podcast.trackId,
      title: podcast.trackName,
      date: podcast.releaseDate,
      duration: convertMillisecondsToHHMMSS(podcast.trackTimeMillis),
      description: podcast.description,
      streamUrl: podcast.previewUrl
    }
  })
  const podcastDetailsData: PodcastDetails = {
    podcastId,
    timestamp: Date.now(),
    episodes
  }
  return podcastDetailsData
}

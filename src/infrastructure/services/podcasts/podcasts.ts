import { Podcast, PodcastDetails, PodcastEpisode } from '../../types/types'
import axios, { CancelToken } from 'axios'
import { convertMillisecondsToHHMMSS } from '../../utils/convertMillisecondsToHHMMSS'
import {
  URL_GET_PODCAST_DETAILS,
  URL_GET_PODCASTS
} from '../../constants/constants'
import validateJSON from '../../utils/validateJSON'

export const getPodcasts = async ({
  cancelToken
}: {
  cancelToken: CancelToken
}) => {
  const response = await axios
    .get(URL_GET_PODCASTS, { cancelToken })
    .catch((error) => {
      console.error({ message: error.message, stack: error.stack })
    })
  const rawPodcasts = response?.data?.feed?.entry
  if (!rawPodcasts) return null
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
  const response = await axios
    .get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        eval(URL_GET_PODCAST_DETAILS)
      )}`,
      { cancelToken }
    )
    .catch((error) => {
      console.error({ message: error.message, stack: error.stack })
    })
  if (!response) return null
  const contents = validateJSON(response?.data?.contents)
  if (!contents) return null
  const episodes: PodcastEpisode[] = contents?.results?.map((podcast: any) => {
    return {
      episodeId: podcast.trackId.toString(),
      title: podcast.trackName,
      date: podcast.releaseDate,
      duration:
        convertMillisecondsToHHMMSS(podcast.trackTimeMillis) ?? 'no data',
      description: podcast.description,
      streamUrl: podcast.previewUrl
    }
  })
  episodes.shift()
  const podcastDetailsData: PodcastDetails = {
    podcastId,
    timestamp: Date.now(),
    episodes
  }
  return podcastDetailsData
}

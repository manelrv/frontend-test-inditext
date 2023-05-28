import axios, { CancelToken } from 'axios'
import { URL_GET_PODCAST_DETAILS } from '../../../constants/constants'
import validateJSON from '../../../utils/validateJSON/validateJSON'
import { PodcastDetails, PodcastEpisode } from '../../../types/types'
import convertMillisecondsToHHMMSS from '../../../utils/convertMillisecondsToHHMMSS/convertMillisecondsToHHMMSS'

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

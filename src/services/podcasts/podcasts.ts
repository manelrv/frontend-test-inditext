import { Podcast } from '../../hooks/usePodcasts/types'
import axios from 'axios'

export const getPodcasts = async () => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )}`
  )
  const contents = await JSON.parse(response.data.contents)
  const rawPodcasts = contents.feed.entry
  console.log({ response, rawPodcasts })
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

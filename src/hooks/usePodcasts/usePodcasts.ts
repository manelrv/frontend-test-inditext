import { useEffect } from 'react'
import { getPodcasts } from '../../infrastructure/services/podcasts/podcasts'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore'
import checkElapsedTime from '../../infrastructure/helpers/checkElapsedTime'

const usePodcasts = () => {
  const { podcasts, setPodcasts, timestamp, setTimestamp } = usePodcastsStore()

  useEffect(() => {
    const now = Date.now()
    if (podcasts.length > 0 && checkElapsedTime(timestamp)) return
    const fetchPodcasts = async () => {
      const newpodcasts = await getPodcasts()
      setPodcasts(newpodcasts)
      setTimestamp(now)
    }
    fetchPodcasts()
  }, [])

  const getPodcastById = (id: string) => {
    return podcasts.find((podcast) => podcast.id === id)
  }

  return { podcasts, getPodcastById }
}

export default usePodcasts

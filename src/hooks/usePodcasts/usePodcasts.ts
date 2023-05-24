import { useEffect } from 'react'
import { getPodcasts } from '../../infrastructure/services/podcasts/podcasts'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

const usePodcasts = () => {
  const { podcasts, setPodcasts, timestamp, setTimestamp } = usePodcastsStore()
  const { setLoading } = useFetchStatusStore()
  useEffect(() => {
    const now = Date.now()
    if (podcasts.length > 0 && checkElapsedTime(timestamp)) return
    const fetchPodcasts = async () => {
      setLoading(true)
      const newpodcasts = await getPodcasts()
      setPodcasts(newpodcasts)
      setTimestamp(now)
      setLoading(false)
    }
    fetchPodcasts()
  }, [])

  const getPodcastById = (id: string) => {
    return podcasts.find((podcast) => podcast.podcastId === id)
  }

  return { podcasts, getPodcastById }
}

export default usePodcasts

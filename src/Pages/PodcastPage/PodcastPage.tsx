import { useParams } from 'react-router-dom'
import usePodcasts from '../../hooks/usePodcasts'
import { Podcast } from '../../hooks/usePodcasts/types'
import { useMemo } from 'react'

const PodcastPage = () => {
  const { podcastId } = useParams()
  const { getPodcastById } = usePodcasts()
  const podcast: Podcast = useMemo(
    () => getPodcastById(podcastId ?? '') ?? ({} as Podcast),
    [podcastId]
  )
  console.log({ podcast })
  return (
    <div className={'podcast-page grid grid-cols-3 gap-10'}>
      <section className={'bg-red-100'}></section>
      <section className={'col-span-2 bg-blue-100'}>{podcastId}</section>
    </div>
  )
}

export default PodcastPage

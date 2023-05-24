import { Podcast } from '../../hooks/usePodcasts/types'
import PodcastSummary from '../PodcastSummary/PodcastSummary'

const PodcastsContainer = ({ podcasts }: { podcasts: Podcast[] }) => {
  return (
    <section className={'podcasts-container mt-20 grid grid-cols-4 gap-6'}>
      {podcasts.map((podcast) => (
        <PodcastSummary key={podcast.id} podcast={podcast} />
      ))}
    </section>
  )
}

export default PodcastsContainer

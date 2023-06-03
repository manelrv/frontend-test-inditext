import { Podcast } from '../../infrastructure/types/types'
import PodcastSummary from '../PodcastSummary/PodcastSummary'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import Loading from '../LoadingComponent/Loading'
import {ReactElement} from "react";

const PodcastsContainer = ({ podcasts }: { podcasts: Podcast[] }): ReactElement => {
  const { loading } = useFetchStatusStore()
  if (loading) {
    return <Loading />
  }
  return (
    <section className={'podcasts-container mt-20 grid grid-cols-4 gap-6'}>
      {podcasts?.map((podcast) => (
        <PodcastSummary key={podcast.podcastId} podcast={podcast} />
      ))}
    </section>
  )
}

export default PodcastsContainer

import { PodcastEpisodeRow } from '../../infrastructure/types/types'
import GridHeader from './components/GridHeader'
import EpisodeRow from './components/EpisodeRow'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import Loading from '../Loading'

interface EpisodesGridProps {
  episodes: PodcastEpisodeRow[]
  podcastId: string
}

const EpisodesGrid = ({ episodes, podcastId }: EpisodesGridProps) => {
  const { loading } = useFetchStatusStore()
  if (loading) {
    return <Loading />
  }
  return (
    <div
      className={
        'episodes-grid flex w-full flex-col gap-2 border border-gray-50 p-4 shadow-lg'
      }
    >
      <div
        className={'grid-header grid grid-cols-6 gap-4 px-2 text-lg font-bold'}
      >
        <GridHeader />
      </div>
      {episodes.length > 0 ? (
        episodes.map((episode, index) => (
          <EpisodeRow
            key={episode.episodeId}
            episode={episode}
            podcastId={podcastId}
            index={index}
          />
        ))
      ) : (
        <p>No episodes found</p>
      )}
    </div>
  )
}

export default EpisodesGrid

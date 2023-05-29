import { PodcastEpisode } from '../../infrastructure/types/types'
import ReactHtmlParser from 'react-html-parser'

interface EpisodeDetailsProps {
  episode: PodcastEpisode
}
const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <div
      className={
        'episode-details flex w-full flex-col gap-4 border border-gray-50 p-4 shadow-lg'
      }
    >
      <p className={'text-3xl font-bold'}>
        {episode?.title ? episode?.title : 'No title'}
      </p>
      <p>
        {episode?.description
          ? ReactHtmlParser(episode?.description)
          : 'No description supplied'}
      </p>
      {episode?.streamUrl ? (
        <audio
          src={episode?.streamUrl}
          controls={true}
          className={'w-full'}
          data-cy={'podcast-player'}
        />
      ) : (
        <p>No audio available</p>
      )}
    </div>
  )
}

export default EpisodeDetails

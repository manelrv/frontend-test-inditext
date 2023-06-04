import { PodcastSummaryType } from '../../infrastructure/types/types'
import { useNavigate } from 'react-router-dom'
import {ReactElement} from "react";
export type PodcastSummaryProps = {
  podcast: PodcastSummaryType
}
const PodcastSummary = ({ podcast }: PodcastSummaryProps): ReactElement => {
  const { name, artist, image, podcastId } = podcast
  const navigate = useNavigate()
  return (
    <div
      className={
        'podcast-summary relative mb-16 flex cursor-pointer flex-col items-center rounded-lg border p-4 shadow-lg transition-all duration-500 hover:shadow-2xl'
      }
      onClick={() => navigate(`/podcast/${podcastId}`)}
    >
      <img
        src={image}
        loading={'lazy'}
        alt={`${name?.split(' ')?.join('_')}_${podcastId}`}
        className={
          'absolute -top-16 h-32 w-32 rounded-full border border-zinc-200'
        }
      />
      <div className={'mt-16 flex flex-col items-center gap-3 text-center'}>
        <p className={'font-bold'}>{name.toUpperCase()}</p>
        <p className={'text-zinc-400'}>{`Author: ${artist}`}</p>
      </div>
    </div>
  )
}

export default PodcastSummary

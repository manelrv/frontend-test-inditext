import { PodcastSummaryType } from '../../hooks/usePodcasts/types'
import { useNavigate } from 'react-router-dom'

type PodcastSummaryProps = {
  podcast: PodcastSummaryType
}
const PodcastSummary = ({ podcast }: PodcastSummaryProps) => {
  const { name, artist, image, id } = podcast
  const navigate = useNavigate()
  return (
    <div
      className={
        'podcast-summary relative mb-16 flex cursor-pointer flex-col items-center rounded-lg border p-4 shadow-lg transition-all duration-500 hover:shadow-2xl'
      }
      onClick={() => navigate(`/podcast/${id}`)}
    >
      <img
        src={image}
        alt={name}
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
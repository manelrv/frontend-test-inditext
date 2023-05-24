import { Podcast } from '../../infrastructure/types/types'

const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const { name, artist, description, image } = podcast
  console.log({ podcast })
  return (
    <div
      className={
        'podcast-card flex flex-col gap-4 divide-y-2 border border-gray-50 px-4 py-6 shadow-xl'
      }
    >
      <img src={image} alt={name} className={'px-10'} />
      <p className={'py-4'}>
        <span className={'text-2xl font-bold'}>{name}</span>
        <span className={'block italic'}>{`by ${artist}`}</span>
      </p>
      <p className={'overflow-hidden text-ellipsis py-4'}>
        <span className={'text-xl font-bold'}>Description:</span>
        <span className={'block pt-2 italic'}>{description}</span>
      </p>
    </div>
  )
}

export default PodcastCard

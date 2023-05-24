import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

interface ListOfEpisodesHeaderProps {
  numberOfEpisodes: number
}
const ListOfEpisodesHeader = ({
  numberOfEpisodes
}: ListOfEpisodesHeaderProps) => {
  const { loading } = useFetchStatusStore()
  return (
    <div
      className={
        'h-16 w-full border border-gray-50 p-4 text-3xl font-bold shadow-lg'
      }
    >
      {loading ? (
        <div
          className={'flex h-full w-full animate-pulse rounded bg-slate-200'}
        />
      ) : (
        <p>{`Episodes: ${numberOfEpisodes}`}</p>
      )}
    </div>
  )
}

export default ListOfEpisodesHeader

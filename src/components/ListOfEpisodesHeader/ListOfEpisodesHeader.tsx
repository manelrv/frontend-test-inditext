interface ListOfEpisodesHeaderProps {
  numberOfEpisodes: number
}
const ListOfEpisodesHeader = ({
  numberOfEpisodes
}: ListOfEpisodesHeaderProps) => {
  return (
    <div>
      <p
        className={'border border-gray-50 p-4 text-3xl font-bold shadow-lg'}
      >{`Episodes: ${numberOfEpisodes}`}</p>
    </div>
  )
}

export default ListOfEpisodesHeader

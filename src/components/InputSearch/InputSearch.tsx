import { ChangeEvent } from 'react'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
type InputSearchProps = {
  filter: string
  handleFilter: (e: ChangeEvent<HTMLInputElement>) => void
  podcastsCount: number
}

const InputSearch = ({
  filter,
  handleFilter,
  podcastsCount
}: InputSearchProps) => {
  const { loading } = useFetchStatusStore()
  return (
    <section
      className={'input-search flex w-full items-center justify-end gap-4'}
    >
      <p
        className={
          'rounded-xl bg-blue-600 px-4 py-1 text-xl font-bold text-white'
        }
      >
        {podcastsCount <= 0 ? '-' : podcastsCount}
      </p>
      <input
        className={
          'w-1/4 rounded-md border-2 border-gray-300 p-2 focus:border-blue-300 focus:outline-0'
        }
        type={'text'}
        value={filter}
        onChange={handleFilter}
        autoFocus
        disabled={loading}
      />
    </section>
  )
}

export default InputSearch

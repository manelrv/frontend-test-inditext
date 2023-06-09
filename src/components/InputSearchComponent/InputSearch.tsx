import { ChangeEvent, ReactElement } from 'react'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore/fecthStatus'
type InputSearchProps = {
  filter: string
  // eslint-disable-next-line no-unused-vars
  handleFilter: (e: ChangeEvent<HTMLInputElement>) => void
  podcastsCount: number
}

const InputSearch = ({
  filter,
  handleFilter,
  podcastsCount
}: InputSearchProps): ReactElement => {
  const { loading } = useFetchStatusStore()
  return (
    <section
      className={'input-search flex w-full items-center justify-end gap-4'}
    >
      <p
        className={
          'rounded-xl bg-primary px-4 py-1 text-xl font-bold text-white'
        }
      >
        {podcastsCount <= 0 ? '-' : podcastsCount}
      </p>
      <input
        className={
          'w-1/4 rounded-md border-2 border-gray-300 p-2 focus:border-primary focus:outline-0'
        }
        type={'text'}
        value={filter}
        onChange={handleFilter}
        autoFocus
        disabled={loading}
        placeholder={'Disgraceland, Andrew, etc...'}
      />
    </section>
  )
}

export default InputSearch

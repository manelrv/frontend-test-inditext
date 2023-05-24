import { useNavigate } from 'react-router-dom'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
const Header = () => {
  const navigate = useNavigate()
  const { loading } = useFetchStatusStore()
  return (
    <header className={'header flex justify-between border-b pb-4'}>
      <button
        onClick={() => navigate('/')}
        disabled={window.location.pathname === '/'}
      >
        <p className={'items-center text-2xl font-bold text-blue-600'}>
          Podcaster
        </p>
      </button>
      {loading && (
        <div
          className={
            'h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-sky-500 to-indigo-50'
          }
        ></div>
      )}
    </header>
  )
}

export default Header

import { useNavigate } from 'react-router-dom'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore/fecthStatus'
import {ReactElement} from "react";
const Header = (): ReactElement => {
  const navigate = useNavigate()
  const { loading } = useFetchStatusStore()
  return (
    <header className={'header flex justify-between border-b pb-4'}>
      <button
        onClick={() => navigate('/')}
        disabled={location.pathname === '/'}
        data-testid={'home-button'}
      >
        <p className={'items-center text-2xl font-bold text-blue-600'}>
          Podcaster
        </p>
      </button>
      {loading && (
        <div
          className={
            'flex h-7 w-7 animate-spin items-center justify-center rounded-full bg-gradient-to-r from-violet-800 to-blue-400'
          }
          data-testid={'loading-signal'}
        >
          <div
            className={' h-3 w-3 animate-pulse rounded-full bg-blue-900'}
          ></div>
        </div>
      )}
    </header>
  )
}

export default Header

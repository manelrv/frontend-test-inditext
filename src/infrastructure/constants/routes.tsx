import { RouteObject } from 'react-router-dom'
import HomePage from '../../Pages/HomePage'
import PodcastPage from '../../Pages/PodcastPage'
import EpisodePage from '../../Pages/EpisodePage'

// Define las rutas como objetos de tipo RouteObject
const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/podcast/:podcastId',
    element: <PodcastPage />
  },
  {
    path: '/podcast/:podcastId/episode/:episodeId',
    element: <EpisodePage />
  }
]

export default ROUTES

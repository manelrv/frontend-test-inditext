import { RouteObject } from 'react-router-dom'
import Home from '../../pages/HomePage/Home'
import Podcast from '../../pages/PodcastPage/Podcast'
import Episode from '../../pages/EpisodePage/Episode'

// Define las rutas como objetos de tipo RouteObject
const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/podcast/:podcastId',
    element: <Podcast />
  },
  {
    path: '/podcast/:podcastId/episode/:episodeId',
    element: <Episode />
  }
]

export default ROUTES

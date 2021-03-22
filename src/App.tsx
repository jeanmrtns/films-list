import { useState } from 'react'

import './styles/global.scss'

import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar {...{ setSelectedGenre, setMovies }} />
      <Content {...{ selectedGenre, movies }} />
    </div>
  )
}

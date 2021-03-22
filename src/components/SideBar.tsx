import { Button } from './Button'
import '../styles/sidebar.scss'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

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

interface SideBarProps {
  setSelectedGenre: any
  setMovies: any
}

export function SideBar({ setSelectedGenre, setMovies }: SideBarProps) {
  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data)
      })
  }, [selectedGenreId])

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map((genre: GenreResponseProps) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}

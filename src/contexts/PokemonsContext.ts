import { Pokemon } from '@interfaces'
import { createContext } from 'react'

type PokemonsContextType = {
  checkIsFavorite: (id) => boolean
  favorites: Array<Pokemon>
  getPokemons: () => Promise<void>
  handleFavorites: (pokemon: Pokemon) => void
  handleNextPage: () => void
  handlePreviousPage: () => void
  handleSearch: (value: string) => void
  filteredPokemons: Array<Pokemon>
  pokemons: { [key: string]: Array<Pokemon> }
  url: string
}

export const PokemonsContext = createContext<PokemonsContextType>({
  checkIsFavorite: () => false,
  favorites: [],
  filteredPokemons: [],
  getPokemons: () => undefined,
  handleFavorites: () => undefined,
  handleNextPage: () => undefined,
  handlePreviousPage: () => undefined,
  handleSearch: () => undefined,
  pokemons: {},
  url: ''
})

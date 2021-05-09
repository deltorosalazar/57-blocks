import { Pokemon } from '@interfaces'
import { createContext } from 'react'

type PokemonsContextType = {
  favorites: Array<string>
  getPokemons: (currentPage: number) => Promise<void>
  handleFavorites: (pokemonID: string) => void
  pokemons: { [key: string]: Array<Pokemon> }
  url: string
}

export const PokemonsContext = createContext<PokemonsContextType>({
  favorites: [],
  getPokemons: () => undefined,
  handleFavorites: () => undefined,
  pokemons: {},
  url: ''
})

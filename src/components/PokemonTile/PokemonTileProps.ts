import { ReactNode } from 'react'

type PokemonTileProps = ReactNode & {
  id: string,
  name: string,
  type: string,
  pictureURL: string,
  isFavorite?: boolean
  handleIsFavorite?: (pokemonID: string) => void
}

export default PokemonTileProps
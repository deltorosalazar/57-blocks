import { Pokemon } from '@interfaces'
import { ReactNode } from 'react'

type PokemonTileProps = ReactNode & {
  id: string,
  name: string,
  type: string,
  pictureURL: string,
  isFavorite?: boolean
  handleIsFavorite?: (pokemon: Pokemon) => void
}

export default PokemonTileProps
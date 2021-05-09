import { ReactNode } from 'react'
import { Pokemon } from '@interfaces'

type PokemonListProps = ReactNode & {
  currentPage?: number
  data?: Array<Pokemon>
  handlePreviousPage?: () => void
  handleNextPage?: () => void
}

export default PokemonListProps

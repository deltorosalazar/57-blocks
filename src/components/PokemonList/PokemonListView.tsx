import { FC } from 'react'
import { Button, PokemonTile } from '@components'
import PokemonListProps from './PokemonListProps'
import { Pokemon } from '@interfaces'
import styles from './styles.module.scss'

type PokemonListViewProps = PokemonListProps & {
  currentPage: number
  data: Array<Pokemon>
  handlePreviousPage: () => void
  handleNextPage: () => void
  isLoading: boolean
}

const PokemonListView: FC<PokemonListViewProps> = (props) => {
  const {
    currentPage,
    data = [],
    handlePreviousPage,
    handleNextPage,
    isLoading
  } = props

  return (
    <div className={styles.pokemonList}>
      <div className={styles.paginationWrapper}>
        <Button
          disabled={currentPage === 1}
          label='Previous'
          onClick={(e) => handlePreviousPage()}
        />
        <Button
          label='Next'
          onClick={(e) => handleNextPage()}
        />
      </div>
      <div className={styles.listWrapper}>
        {isLoading && (
          <p>Fetching Pokemons....</p>
        )}

        {!isLoading && data.map(pokemon => {
          return (
            <PokemonTile
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              pictureURL={pokemon.pictureURL}
              type={pokemon.type}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PokemonListView

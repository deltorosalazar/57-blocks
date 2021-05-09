import { FC, useContext, useEffect, useState } from 'react'
import { PokemonsContext } from '@contexts'
import { PokemonTileView } from './PokemonTileView'
import PokemonTileProps from './PokemonTileProps'
import { Pokemon } from '@interfaces'

export const PokemonTile: FC<PokemonTileProps> = (props) => {
  const {
    id,
    name
  } = props

  const pokemonsContext = useContext(PokemonsContext)

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(pokemonsContext.checkIsFavorite(id))
  }, [])

  const handleIsFavorite = (pokemon: Pokemon) => {
    setIsFavorite(!isFavorite)

    pokemonsContext.handleFavorites(pokemon)
  }

  return (
    <PokemonTileView
      isFavorite={isFavorite}
      handleIsFavorite={handleIsFavorite}
      {...props}
    />
  )
}

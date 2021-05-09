import { FC, useContext, useEffect, useState } from 'react'
import { PokemonsContext } from '@contexts'
import { PokemonTileView } from './PokemonTileView'
import PokemonTileProps from './PokemonTileProps'

export const PokemonTile: FC<PokemonTileProps> = (props) => {
  const {
    id,
    name
  } = props

  const pokemonsContext = useContext(PokemonsContext)

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(pokemonsContext.favorites.includes(id))
  }, [])

  const handleIsFavorite = (pokemonID: string) => {
    setIsFavorite(!isFavorite)

    pokemonsContext.handleFavorites(pokemonID)
  }

  return (
    <PokemonTileView
      isFavorite={isFavorite}
      handleIsFavorite={handleIsFavorite}
      {...props}
    />
  )
}

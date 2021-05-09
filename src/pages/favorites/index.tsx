import { useContext, useEffect } from 'react'
import Head from 'next/head'
import { PokemonList } from '@components'
import { PokemonsContext } from '@contexts'
import { withAuth } from '@hoc'
import { BaseLayout } from '@layouts'

const FavoritesPage = () => {
  const pokemonsContext = useContext(PokemonsContext)

  return (
    <BaseLayout showSearchBox={false}>
      <Head>
        <title>57Blocks | Pokemon List</title>
      </Head>
      {pokemonsContext.favorites && pokemonsContext.favorites.length === 0 && (
        <h2>You have no favorite pokemons</h2>
      )}

      {pokemonsContext.favorites && pokemonsContext.favorites.length > 0 && (
        <PokemonList
          data={pokemonsContext.favorites}
        />
      )}

    </BaseLayout>

  )
}

export default withAuth(FavoritesPage)

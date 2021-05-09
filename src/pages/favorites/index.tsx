import { useContext, useEffect } from 'react'
import Head from 'next/head'
import { PokemonList } from '@components'
import { PokemonsContext } from '@contexts'
import { withAuth } from '@hoc'
import { BaseLayout } from '@layouts'

const FavoritesPage = () => {
  const pokemonsContext = useContext(PokemonsContext)

  useEffect(() => {

  }, [])


  return (
    <BaseLayout showSearchBox={false}>
      <Head>
        <title>57Blocks | Pokemon List</title>
      </Head>
      <PokemonList />
    </BaseLayout>

  )
}

export default withAuth(FavoritesPage)

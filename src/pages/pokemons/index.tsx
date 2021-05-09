import Head from 'next/head'
import { PokemonList, PokemonTile } from '@components'
import { BaseLayout } from '@layouts'
import { withAuth } from '@hoc'

const FavoritesPage = () => {
  return (
    <BaseLayout>
      <Head>
        <title>57Blocks | Pokemon List</title>
      </Head>
      <PokemonList />
    </BaseLayout>

  )
}

export default withAuth(FavoritesPage)

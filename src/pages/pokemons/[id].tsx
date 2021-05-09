import Head from 'next/head'
import { useRouter } from 'next/router'
import { PokemonDetails } from '@components'
import { usePokemon } from '@hooks'
import { BaseLayout } from '@layouts'

const PokemonPage = () => {
  const { query } = useRouter()
  const { pokemon, isLoading, isError } = usePokemon(query.id)

  return (
    <BaseLayout showSearchBox={false}>
      <Head>
        <title>57Blocks | Pokemon</title>
      </Head>
      {isLoading && (
        <h2>Loading...</h2>
      )}

      {isError && (
        <h2>There was an error</h2>
      )}

      {pokemon && (
        <PokemonDetails
          id={query.id as string}
          data={pokemon}
        />
      )}
    </BaseLayout>

  )
}

export default PokemonPage

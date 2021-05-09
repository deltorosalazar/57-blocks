import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { PokemonList } from '@components'
import { PokemonsContext } from '@contexts'
import { ComponentState } from '@enums'
import { withAuth } from '@hoc'
import { BaseLayout } from '@layouts'

const PokemonListPage = () => {
  const pokemonsContext = useContext(PokemonsContext)

  const [status, setStatus] = useState(ComponentState.Pending)

  useEffect(() => {
    setStatus(ComponentState.Pending)

    getPokemons().then(() => {
      setStatus(ComponentState.Idle)
    })
  }, [])

  const getPokemons = async () => {
    await pokemonsContext.getPokemons()
  }

  return (
    <BaseLayout>
      <Head>
        <title>57Blocks | Pokemon List</title>
      </Head>
      {status === ComponentState.Pending && (
        <h2>Fetching Pokemons ...</h2>
      )}

      {status === ComponentState.Idle && (
        <PokemonList
          data={pokemonsContext.filteredPokemons}
          handleNextPage={pokemonsContext.handleNextPage}
          handlePreviousPage={pokemonsContext.handlePreviousPage}
        />
      )}
    </BaseLayout>

  )
}

export default withAuth(PokemonListPage)

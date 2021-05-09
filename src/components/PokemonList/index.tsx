import { FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PokemonsContext } from '@contexts'
import { ComponentState } from '@enums'
import PokemonListProps from './PokemonListProps'
import PokemonListView from './PokemonListView'

export const PokemonList: FC<PokemonListProps> = (props) => {
  const pokemonsContext = useContext(PokemonsContext)

  const [status, setStatus] = useState(ComponentState.Idle)
  const [currentPage, setCurrentPage] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!router.query['page']) {
      return
    }

    setCurrentPage(parseInt(router.query['page'] as string))

    router.push(router)

  }, [router.query['page']])

  useEffect(() => {
    if (!currentPage) {
      return
    }

    setStatus(ComponentState.Pending)

    router.query['page'] = currentPage.toString()

    getPokemons(currentPage)

    setStatus(ComponentState.Idle)
  }, [currentPage])


  const getPokemons = async (currentPage: number) => {
    await pokemonsContext.getPokemons(currentPage)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage => parseInt(currentPage) - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage => parseInt(currentPage) + 1)
  }

  return (
    <PokemonListView
      currentPage={currentPage}
      data={pokemonsContext.pokemons[currentPage]}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
      isLoading={status === ComponentState.Pending}
      {...props}
    />
  )
}

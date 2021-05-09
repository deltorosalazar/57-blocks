import { FC, useEffect, useState } from 'react'
import { ComponentState } from '@enums'
import PokemonListProps from './PokemonListProps'
import PokemonListView from './PokemonListView'

export const PokemonList: FC<PokemonListProps> = (props) => {
  const { data, handleNextPage, handlePreviousPage } = props

  const [currentPage, setCurrentPage] = useState(null)

  useEffect(() => {
    setCurrentPage(props.currentPage)
  }, [])

  return (
    <PokemonListView
      currentPage={currentPage}
      data={data}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
      isLoading={status === ComponentState.Pending}
      {...props}
    />
  )
}

import useSWR from 'swr'

export const usePokemon = (id) => {
  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return {
    pokemon: data,
    isLoading: !error && !data,
    isError: error
  }
}
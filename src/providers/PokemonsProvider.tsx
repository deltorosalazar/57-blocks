import { useContext, useEffect, useState } from 'react'
import { AppContext, AuthContext, PokemonsContext } from '@contexts'
import { Pokemon } from '@interfaces'
import { cookies } from 'shared/utils'

export const PokemonsProvider = ({ children }) => {
  const appContext = useContext(AppContext)
  const authContext = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(20)
  const [offset, setOffset] = useState(0)
  const [url] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const [pokemons, setPokemons] = useState<{ [key: string]: Array<Pokemon> }>({})
  const [favorites, setFavorites] = useState<Array<string>>(null)

  useEffect(() => {
    if (!authContext.user) {
      return
    }

    const favorites = cookies.getCookie('favorites')

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites)

      setFavorites(parsedFavorites[authContext.user.id] || [])
    } else {
      setFavorites([])
    }
  }, [authContext.user])

  const fetchPokemon = async (url: string): Promise<any> => {
    try {
      const response = await fetch(url)

      return Promise.resolve(response.json())
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const buildUrl = (currentPage: number) => {
    const offset = limit * (currentPage - 1)

    setOffset(offset)

    return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  }

  const getPokemons = async (currentPage: number) => {
    if (pokemons[currentPage]) {
      return
    }

    try {
      const response = await fetch(buildUrl(currentPage))
      const data = await response.json()

      const pokemons = data.results
      const pokemonPromises = pokemons.map(pokemon => {
        return fetchPokemon(pokemon.url)
      })

      const fetchedPokemons = await Promise.all(pokemonPromises)
      const parsedPokemons = parsePokemons(fetchedPokemons)

      setPokemons(pokemons => {
        return {
          [currentPage]: parsedPokemons,
          ...pokemons
        }
      })
    } catch (error) {
      appContext.showToast('There was an error fetching the pokemons', 'error')
    }
  }

  const parsePokemons = (pokemons: []): Array<Pokemon> => {
    return pokemons.map(pokemon => {
      return {
        id: pokemon['id'],
        name: pokemon['name'],
        pictureURL: pokemon['sprites']['front_default'],
        type: pokemon['types'][0]['type']['name']
      }
    })
  }

  const handleFavorites = (pokemonID) => {
    let updatedFavorites = favorites

    if (favorites.includes(pokemonID)) {
      updatedFavorites = favorites.filter(favoritePokemon => {
        return favoritePokemon !== pokemonID
      })
    } else {
      updatedFavorites = [...favorites, pokemonID]
    }

    setFavorites(updatedFavorites)
    updateFavoritesCookie(updatedFavorites)
  }

  const updateFavoritesCookie = (favorites: Array<string>) => {
    const currentCookie = cookies.getCookie('favorites')
    let parsedCookie = {}

    if (currentCookie) {
      parsedCookie = JSON.parse(currentCookie)
    }

    parsedCookie = {
      ...parsedCookie,
      [authContext.user.id]: favorites
    }

    cookies.setCookie('favorites', JSON.stringify(parsedCookie))
  }

  const defaultValue = {
    favorites,
    getPokemons,
    handleFavorites,
    pokemons,
    url
  }

  return (
    <PokemonsContext.Provider value={defaultValue}>
      {children}
    </PokemonsContext.Provider>
  )
}
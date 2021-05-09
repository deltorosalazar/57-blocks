import { useContext, useEffect, useState } from 'react'
import { AppContext, AuthContext, PokemonsContext } from '@contexts'
import { Pokemon } from '@interfaces'
import { cookies } from 'shared/utils'
import { useRouter } from 'next/router'

export const PokemonsProvider = ({ children }) => {
  const appContext = useContext(AppContext)
  const authContext = useContext(AuthContext)

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(null)
  const [searchString, setSearchString] = useState("")
  const [limit] = useState(20)
  const [offset, setOffset] = useState(0)
  const [url] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const [pokemons, setPokemons] = useState<{ [key: string]: Array<Pokemon> }>({})
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [favorites, setFavorites] = useState<Array<Pokemon>>(null)

  useEffect(() => {
    if (!authContext.user) {
      return
    }

    const favorites = cookies.getCookie('favorites')

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites)

      getFavoritedPokemons(parsedFavorites[authContext.user.id])
        .then((pokemons) => {
          setFavorites(pokemons || [])
        })
    } else {
      setFavorites([])
    }
  }, [authContext.user])

  const getFavoritedPokemons = (pokemonIDs): Promise<Array<Pokemon>> => {
    return new Promise(async (resolve, reject) => {
      const favoritesPromises = pokemonIDs.map(pokemonID => {
        return fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      })
      const fetchedPokemons = await Promise.all(favoritesPromises)
      const parsedPokemons = parsePokemons(fetchedPokemons)

      resolve(parsedPokemons)
    })
  }

  useEffect(() => {
    if (!pokemons[currentPage]) {
      return
    }

    if (!searchString) {
      setFilteredPokemons(pokemons[currentPage])
    }

    setFilteredPokemons(pokemons[currentPage].filter(pokemon => {
      return pokemon.name.includes(searchString)
    }))
  }, [searchString])

  useEffect(() => {
    if (!pokemons[currentPage]) {
      return
    }

    setFilteredPokemons(pokemons[currentPage])
  }, [pokemons])

  useEffect(() => {
    if (!currentPage) {
      return
    }

    router.query['page'] = currentPage.toString()
    router.push(router)

    getPokemons()

  }, [currentPage])

  const handleNextPage = () => {

    setCurrentPage(currentPage => {
      return currentPage + 1
    })
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage => {
      if (currentPage === 1) {
        return currentPage
      }

      return currentPage - 1
    })
  }

  const fetchPokemon = async (url: string): Promise<any> => {
    try {
      const response = await fetch(url)

      return Promise.resolve(response.json())
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const handleSearch = (value: string) => {
    setSearchString(value)
  }

  const buildUrl = (currentPage: number) => {
    const offset = limit * (currentPage - 1)

    setOffset(offset)

    return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  }

  const getPokemons = async () => {
    if (pokemons[currentPage]) {
      setFilteredPokemons(pokemons[currentPage])
      return
    }

    try {
      const response = await fetch(buildUrl(currentPage || 1))
      const data = await response.json()

      const pokemonResults = data.results
      const pokemonPromises = pokemonResults.map(pokemon => {
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

      if (!currentPage) {
        setCurrentPage(1)
      }
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

  const checkIsFavorite = (id: string) => {
    return favorites.reduce((prev, curr) => {
      return prev || curr.id === id
    }, false)
  }

  const handleFavorites = (pokemon: Pokemon) => {
    let updatedFavorites = favorites

    const isPokemonFavorited = checkIsFavorite(pokemon.id)

    if (isPokemonFavorited) {
      updatedFavorites = favorites.filter(favoritePokemon => {
        return favoritePokemon.id !== pokemon.id
      })
    } else {
      updatedFavorites = [...favorites, pokemon]
    }

    setFavorites(updatedFavorites)
    updateFavoritesCookie(updatedFavorites.map(pokemon => pokemon.id))
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
    checkIsFavorite,
    favorites,
    filteredPokemons,
    getPokemons,
    handleFavorites,
    handleNextPage,
    handlePreviousPage,
    handleSearch,
    pokemons,
    url
  }

  return (
    <PokemonsContext.Provider value={defaultValue}>
      {children}
    </PokemonsContext.Provider>
  )
}
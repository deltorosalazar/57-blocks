import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AppContext, AuthContext } from '@contexts'
import { cookies } from 'shared/utils'


const validUser = {
  id: '704a5e14',
  username: 'username',
  password: 'password',
}

const COOKIE_NAME = 'authToken'

export const AuthProvider = ({ children }) => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const [user, setUser] = useState(null)

  const logIn = async (username: string, password: string) => {
    const user = checkUser(username, password)

    if (!user) {
      appContext.showToast('Wrong email or password', 'error')

      return Promise.resolve(false)
    }

    setUserCookie(user.id)
    setUser(validUser)
    router.push('/pokemons?page=1');

    return Promise.resolve(true)
  }

  const logOut = async () => {
    deleteUserCookie()

    router.push('/');
  }

  const checkUser = (username: string, password: string) => {
    if (
      username === validUser.username &&
      password === validUser.password
    ) {
      return validUser
    }

    return null
  }

  const setUserCookie = (userID: string) => {
    cookies.setCookie(COOKIE_NAME, userID)
  }

  const deleteUserCookie = () => {
    cookies.deleteCookie(COOKIE_NAME)
  }

  const isUserLoggedIn = () => {
    if (!user) {
      if (cookies.getCookie(COOKIE_NAME)) {
        setUser(validUser)
        return true
      }

      return false
    }

    return true
  }

  const defaultValue = {
    isUserLoggedIn,
    user,
    logIn,
    logOut
  }

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  )
}
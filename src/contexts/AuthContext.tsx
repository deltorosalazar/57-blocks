import { createContext } from 'react'

type AuthContextType = {
  isUserLoggedIn: () => boolean
  logIn: (username: string, password: string) => Promise<boolean>
  logOut: () => void,
  user: {
    id: string,
    username: string
  } | null
}

export const AuthContext = createContext<AuthContextType>({
  isUserLoggedIn: () => false,
  logIn: (username: string, password: string) => Promise.resolve(false),
  logOut: () => undefined,
  user: null
})

import { createContext } from 'react'

type AppContextType = {
  showToast: (message: string, appearance: string) => void
}

export const AppContext = createContext<AppContextType>({
  showToast: (message: string, appearance: string) => undefined
})

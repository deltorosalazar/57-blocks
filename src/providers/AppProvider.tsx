import { AppContext } from '@contexts'
import { AppearanceTypes, useToasts } from 'react-toast-notifications'

export const AppProvider = ({ children }) => {
  const { addToast } = useToasts()

  const showToast = (message: string, appearance: AppearanceTypes) => {
    addToast(message, {
      appearance
    })
  }

  const defaultValue = {
    showToast
  }

  return (
    <AppContext.Provider value={defaultValue}>
      {children}
    </AppContext.Provider>
  )
}
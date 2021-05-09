import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@contexts'

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const authContext = useContext(AuthContext)

    const [isLoading, setIsLoadind] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    const router = useRouter()

    useEffect(() => {
      if (authContext.isUserLoggedIn()) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
        router.push('/')
      }

      setIsLoadind(false)
    }, [])

    if (isLoading && !isAuth || !isLoading && !isAuth) {
      return <h1>Loading...</h1>
    }

    if (!isLoading && isAuth) {
      return <WrappedComponent {...props} />
    }
  }
}
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AppProvider, AuthProvider, PokemonsProvider } from '@providers'
import { ToastProvider } from 'react-toast-notifications'
import { motion } from 'framer-motion'
import '../styles/globals.css'

function App(props: AppProps) {
  const { Component, pageProps, router } = props

  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}
    >
      <Head>
        <meta
          content='width=device-width, initial-scale=1.0'
          name='viewport'
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ToastProvider>
        <AppProvider>
          <AuthProvider>
            <PokemonsProvider>
              <Component {...pageProps} />
            </PokemonsProvider>
          </AuthProvider>
        </AppProvider>
      </ToastProvider>
    </motion.div>
  )
}

export default App

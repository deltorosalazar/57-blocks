import Head from 'next/head'
import { CardLayout } from '@layouts'
import { LoginForm } from '@components'

const Home = () => {
  return (
    <CardLayout>
      <Head>
        <title>57Blocks | Login</title>
      </Head>
      <LoginForm />
    </CardLayout>

  )
}

export default Home

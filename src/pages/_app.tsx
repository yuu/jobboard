import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/components/context/AuthContext'
import { JobProvider } from 'src/components/context/JobContext'
import { HireProvider } from 'src/components/context/HireContext'
import Layout from 'src/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <JobProvider>
        <HireProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HireProvider>
      </JobProvider>
    </AuthProvider>
  )
}

export default MyApp

import { ReactNode } from 'react'
import SEO from './SEO'
import Nav from 'src/components/common/Nav'
import Footer from 'src/components/Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SEO />
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default Layout

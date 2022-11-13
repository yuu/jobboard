import SEO from './SEO'
import Nav from 'src/components/common/Nav'
import Footer from 'src/components/Footer'

const Layout = ({ children }) => {
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

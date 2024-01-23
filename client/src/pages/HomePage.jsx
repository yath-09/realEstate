import Slide from "../component/Slide"
import Navbar from '../component/Navbar'
import Categories from "../component/Category"
import Listings from "../component/Listings"
import Footer from "../component/Footer"
const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </>
  )
}

export default HomePage
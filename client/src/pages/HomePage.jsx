import Slide from "../component/Slide"
import Navbar from '../component/Navbar'
import Categories from "../component/Category"
import Listings from "../component/Listings"
const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Slide/>
      <Categories/>
      <Listings/>
    </>
  )
}

export default HomePage
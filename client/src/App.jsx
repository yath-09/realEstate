import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import HomePage from "../src/pages/HomePage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App

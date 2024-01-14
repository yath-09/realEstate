import  { useState } from "react";
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // handle submitng function
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch ("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()
    
      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )

        //navigate to the home
        setPasswordMatch(false)
        navigate("/")
      }
      else{
        setPasswordMatch(true)
        
      }
    

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           {passwordMatch && (
            <p style={{ color: "red" }}>Invalid creditials!</p>
          )} 
        
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Do not have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
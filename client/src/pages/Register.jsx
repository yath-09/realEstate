import { useState,useEffect } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router";
const Register = () => {
  const [userExist,setUserExist]=useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // to take take the data previous stored
    setFormData({
       ...formData,
      [name]: value, // storing it in the value input dynamicaally
      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  const [passwordMatch, setPasswordMatch] = useState(true)
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })
      if(response.status==409) setUserExist(true);
      if (response.ok) {
        setUserExist(false)
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }
  
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  },[formData.confirmPassword])


  return (
    <div className="register min-h-screen flex justify-center items-center flex-col bg-cover bg-center">
      <div className="register_content">
        <form className="register_content_form" 
            onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           {userExist && (
            <p style={{ color: "red" }}>User with email already exist</p>
          )}
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}


          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor='image'>
            <img src="../src/assets/uploadPhoto.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "60px" }}
            />
          )}
          
         
          <button type="submit" disabled={!passwordMatch}>REGISTER</button> </form>
          
          
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  )
}

export default Register
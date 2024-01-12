import "../styles/Register.scss";

const Register = () => {
   




  return (
    <div className="register min-h-screen flex justify-center items-center flex-col bg-cover bg-center">
      <div className="register_content">
        <form className="register_content_form" >
          <input
            placeholder="First Name"
            name="firstName"
        
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            
            required
          />
          <input
            placeholder="Password"
            name="password"
           
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            
            type="password"
            required
          />

         

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor='image'>
            <img src="../src/assets/uploadPhoto.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

        
          <button type="submit" className="mt-15 w-1/2 hover:shadow-md bg-pink-400 text-red-500">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  )
}

export default Register
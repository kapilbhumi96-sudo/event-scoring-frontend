import { useState } from 'react'    // useState stores the values entered by the user.
import axios from 'axios'   

function Login() {
  const [email, setEmail] = useState('')    // email state stores the email typed into the email input.
  const [password, setPassword] = useState('')    // password state stores the password typed into the password input.
  const [message, setMessage] = useState('')      // message state stores success or error messages shown to the user.

  const handleLogin = async () => {               // handleLogin runs when the Login button is clicked.
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {   
        email: email,             // axios.post() sends the login data from React to the Spring Boot backend.
        password: password
      })
      setMessage('Logged in successfully')
    } catch (error) {
      setMessage('Login failed')
    }
  }

return (
    <div className="card">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p className={message === 'Logged in successfully' ? 'message' : 'message error'}>{message}</p>
    </div>
  )
}
// onChange runs whenever the user types or changes an input.
// e.target.value gives the current value entered in the input.

export default Login

// The login request sends email and password as JSON.
// The backend returns a JWT token after successful login.
// localStorage.setItem() saves the JWT token inside the browser.
// The saved JWT can be reused for future protected API requests.
// localStorage.getItem('token') retrieves the previously saved JWT.
// try/catch handles successful and failed API requests.
// export default Login allows the component to be imported into App.jsx.
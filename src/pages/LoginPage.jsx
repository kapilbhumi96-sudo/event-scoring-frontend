import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password
      })
      localStorage.setItem('token', response.data)
      navigate('/dashboard')
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
      <p className="message error">{message}</p>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

export default LoginPage
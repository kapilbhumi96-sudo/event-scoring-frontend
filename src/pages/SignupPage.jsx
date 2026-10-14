import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('PARTICIPANT')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name: name,
        email: email,
        password: password,
        role: role
      })
      navigate('/login')
    } catch (error) {
      setMessage('Signup failed')
    }
  }

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="PARTICIPANT">Participant</option>
        <option value="JUDGE">Judge</option>
        <option value="ORGANIZER">Organizer</option>
      </select>
      <button onClick={handleSignup}>Create Account</button>
      <p className="message error">{message}</p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default SignupPage
import { useState } from 'react'
import axios from 'axios'

function RegisterParticipant({ categoryId }) {
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:8080/api/categories/${categoryId}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Registered successfully!')
    } catch (error) {
      setMessage('Registration failed')
    }
  }

  return (
    <div>
      <button onClick={handleRegister}>Register for this Category</button>
      <p>{message}</p>
    </div>
  )
}

export default RegisterParticipant
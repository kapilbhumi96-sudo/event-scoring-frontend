import { useState } from 'react'
import axios from 'axios'

function RegisterParticipant() {
  const [categoryId, setCategoryId] = useState('')
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
    <div className="card">
      <h2>Register</h2>
      <input
        placeholder="Category ID (e.g. 1)"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button onClick={handleRegister}>Register for this Category</button>
      <p className={message === 'Registered successfully!' ? 'message' : 'message error'}>{message}</p>
    </div>
  )
}

export default RegisterParticipant

// This component is used to register a participant for a specific category.
// categoryId is received from the parent component as a prop.
// Props are values passed from a parent component to a child component.
// <RegisterParticipant categoryId={1} /> passes categoryId = 1 to this component.
// The categoryId is inserted into the backend URL.
// The URL identifies which category the participant wants to register for.
// localStorage.getItem('token') retrieves the logged-in user's JWT.
// axios.post() sends the registration request to the backend.
// The request body is {} because this particular endpoint does not require body data.
// The JWT is still required in the Authorization header.
// The backend uses the JWT to identify the participant.
// handleRegister runs when the Register button is clicked.
// message displays whether registration succeeded or failed.
// export default RegisterParticipant allows the component to be imported elsewhere.
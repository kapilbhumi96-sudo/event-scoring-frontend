import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

function CategoryDetailPage() {
  const { id } = useParams()
  const [participants, setParticipants] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const navigate = useNavigate()

  const loadParticipants = (currentUser) => {
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:8080/api/categories/${id}/participants`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setParticipants(response.data)
        if (currentUser && currentUser.role === 'PARTICIPANT') {
          const alreadyIn = response.data.some(p => p.participantName === currentUser.name)
          setIsRegistered(alreadyIn)
        }
      })
      .catch(() => setParticipants([]))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    axios.get('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUser(response.data)
        loadParticipants(response.data)
      })
  }, [id, navigate])

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:8080/api/categories/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Registered successfully!')
      setIsRegistered(true)
      loadParticipants(user)
    } catch (error) {
      setMessage('Registration failed - you may already be registered')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Category</h2>
        <p><Link to="/events">Back to Events</Link></p>
      </div>

      {user && user.role === 'PARTICIPANT' && (
        <div className="card">
          <h2>Your Registration</h2>
          {isRegistered ? (
            <p className="message">You are registered for this category.</p>
          ) : (
            <>
              <button onClick={handleRegister}>Register for this Category</button>
              <p className="message error">{message}</p>
            </>
          )}
        </div>
      )}

      {user && (user.role === 'ORGANIZER' || user.role === 'JUDGE') && (
        <div className="card">
          <h2>Registered Participants</h2>
          {participants.length === 0 && <p>No one registered yet.</p>}
          {participants.map((p) => (
            <div key={p.participantId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span>{p.participantName}</span>
              {user.role === 'JUDGE' && (
                <Link to={`/categories/${id}/score/${p.participantId}`}>
                  <button>Score</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDetailPage
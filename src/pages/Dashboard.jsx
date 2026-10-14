import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) {
    return <div className="card"><p>Loading...</p></div>
  }

  return (
    <div>
      <div className="card">
        <h2>Welcome, {user.name}</h2>
        <p>Role: {user.role}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {user.role === 'ORGANIZER' && (
        <div className="card">
          <h2>Organizer Tools</h2>
          <p><Link to="/create-event">Create a new Event</Link></p>
          <p><Link to="/events">View My Events</Link></p>
        </div>
      )}

      {user.role === 'JUDGE' && (
        <div className="card">
          <h2>Judge Tools</h2>
          <p><Link to="/events">Browse Categories to Score</Link></p>
        </div>
      )}

      {user.role === 'PARTICIPANT' && (
        <div className="card">
          <h2>Participant Tools</h2>
          <p><Link to="/events">Browse Events to Join</Link></p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
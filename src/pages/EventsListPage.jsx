import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function EventsListPage() {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    axios.get('http://localhost:8080/api/events', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setEvents(response.data))
      .catch(() => setEvents([]))
  }, [navigate])

  return (
    <div>
      <div className="card">
        <h2>Events</h2>
        <p><Link to="/dashboard">Back to Dashboard</Link></p>
      </div>

      {events.map((event) => (
        <div className="card" key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.date}</p>
          <Link to={`/events/${event.id}`}>View Categories</Link>
        </div>
      ))}
    </div>
  )
}

export default EventsListPage
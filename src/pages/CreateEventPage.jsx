import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function CreateEventPage() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:8080/api/events',
        { name: name, date: date },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate(`/events/${response.data.id}`)
    } catch (error) {
      setMessage('Failed to create event - only organizers can create events')
    }
  }

  return (
    <div className="card">
      <h2>Create Event</h2>
      <p><Link to="/dashboard">Back to Dashboard</Link></p>
      <input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
      <p className="message error">{message}</p>
    </div>
  )
}

export default CreateEventPage
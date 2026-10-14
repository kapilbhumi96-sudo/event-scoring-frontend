import { useState } from 'react'
import axios from 'axios'

function CreateEvent() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:8080/api/events',
        { name: name, date: date },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Event created: ' + response.data.name)
    } catch (error) {
      setMessage('Failed to create event')
    }
  }

  return (
    <div>
      <h2>Create Event</h2>
      <input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
      <p>{message}</p>
    </div>
  )
}

export default CreateEvent
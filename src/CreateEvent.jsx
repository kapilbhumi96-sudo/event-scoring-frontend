import { useState } from 'react'
import axios from 'axios'

function CreateEvent() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token')   // localStorage.getItem('token') retrieves the JWT obtained during login.
      const response = await axios.post(      // response.data contains the Event returned by the backend after saving.
        'http://localhost:8080/api/events',
        { name: name, date: date },
        { headers: { Authorization: `Bearer ${token}` } }   // "Bearer <token>" is the format expected by the JwtAuthFilter.
      )
      setMessage('Event created: ' + response.data.name)    // response.data.name can be used to display the created event's name.
    } catch (error) {
      setMessage('Failed to create event')
    }
  }

return (
    <div className="card">
      <h2>Create Event</h2>
      <input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
      <p className={message.startsWith('Event created') ? 'message' : 'message error'}>{message}</p>
    </div>
  )
}

export default CreateEvent
// export default CreateEvent allows App.jsx to use this component.
// useState stores the event name, date, and message.
// name state stores the event name entered by the organizer.
// date state stores the event date entered by the organizer.
// message state displays whether the event was created successfully or not.
// onChange updates the corresponding state whenever the user changes an input.
// handleCreate runs when the Create button is clicked.
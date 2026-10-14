import { useState } from 'react'
import axios from 'axios'

function SubmitScore({ participantId }) {
  const [criteria, setCriteria] = useState('')
  const [value, setValue] = useState('')
  const [round, setRound] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:8080/api/participants/${participantId}/scores`,
        { criteria: criteria, value: parseFloat(value), round: parseInt(round) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Score submitted!')
    } catch (error) {
      setMessage('Failed to submit score')
    }
  }

  return (
    <div>
      <h2>Submit Score</h2>
      <input placeholder="Criteria (e.g. Technique)" value={criteria} onChange={(e) => setCriteria(e.target.value)} />
      <input placeholder="Value (e.g. 8.5)" value={value} onChange={(e) => setValue(e.target.value)} />
      <input placeholder="Round" value={round} onChange={(e) => setRound(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  )
}

export default SubmitScore
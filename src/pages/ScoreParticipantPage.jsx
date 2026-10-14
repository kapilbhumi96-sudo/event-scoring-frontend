import { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function ScoreParticipantPage() {
  const { participantId, id } = useParams()
  const [criteria, setCriteria] = useState('')
  const [value, setValue] = useState('')
  const [round, setRound] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

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
      setMessage('Failed to submit score - only judges can score')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Submit Score</h2>
        <p>Scoring participant #{participantId}</p>
        <input placeholder="Criteria (e.g. Technique)" value={criteria} onChange={(e) => setCriteria(e.target.value)} />
        <input placeholder="Value (e.g. 8.5)" value={value} onChange={(e) => setValue(e.target.value)} />
        <input placeholder="Round" value={round} onChange={(e) => setRound(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        <p className={message === 'Score submitted!' ? 'message' : 'message error'}>{message}</p>
        <button onClick={() => navigate(`/categories/${id}`)}>Back to Category</button>
      </div>
    </div>
  )
}

export default ScoreParticipantPage
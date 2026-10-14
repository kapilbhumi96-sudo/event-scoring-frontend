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
    <div className="card">
      <h2>Submit Score</h2>
      <input placeholder="Criteria (e.g. Technique)" value={criteria} onChange={(e) => setCriteria(e.target.value)} />
      <input placeholder="Value (e.g. 8.5)" value={value} onChange={(e) => setValue(e.target.value)} />
      <input placeholder="Round" value={round} onChange={(e) => setRound(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p className={message === 'Score submitted!' ? 'message' : 'message error'}>{message}</p>
    </div>
  )
}

export default SubmitScore

// This component is used by a judge to submit a participant's score.
// participantId is received from the parent component as a prop.
// <SubmitScore participantId={1} /> passes participantId = 1 to this component.
// criteria state stores the scoring criterion entered by the judge.
// value state stores the score entered by the judge.
// round state stores the round number entered by the judge.
// message state displays success or failure information.
// Input values are initially received from HTML inputs as strings.
// parseFloat() converts a string such as "8.5" into the number 8.5.
// parseInt() converts a string such as "2" into the integer 2.
// The backend expects value as a numeric Double and round as an Integer.
// participantId is inserted into the URL to identify which participant is being scored.
// axios.post() sends the score information to the backend.
// The request body contains criteria, value, and round.
// The JWT is retrieved from localStorage and sent in the Authorization header.
// handleSubmit runs when the Submit button is clicked.
// try/catch handles successful and failed score submission.
// export default SubmitScore allows the component to be imported into App.jsx.
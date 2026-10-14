import Login from './Login'
import CreateEvent from './CreateEvent'
import RegisterParticipant from './RegisterParticipant'
import SubmitScore from './SubmitScore'

function App() {
  return (
    <div>
      <Login />
      <hr />
      <CreateEvent />
      <hr />
      <RegisterParticipant categoryId={1} />
      <hr />
      <SubmitScore participantId={1} />
    </div>
  )
}

export default App
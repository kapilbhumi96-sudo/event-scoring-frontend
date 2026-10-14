import Login from './Login'
import CreateEvent from './CreateEvent'
import RegisterParticipant from './RegisterParticipant'
import SubmitScore from './SubmitScore'

function App() {
  return (
    <div>
      <h1 className="app-title">Event Scoring Platform</h1>
      <Login />
      <CreateEvent />
      <RegisterParticipant />
      <SubmitScore />
    </div>
  )
}

export default App

// App.jsx acts as the main component that combines the other frontend components.
// Import statements make the individual components available inside App.jsx.
// <Login /> displays the login form.
// <CreateEvent /> displays the event creation form.
// <RegisterParticipant /> displays the participant registration button.
// <SubmitScore /> displays the judge's score submission form.
// categoryId={1} passes category ID 1 to RegisterParticipant.
// participantId={1} passes participant ID 1 to SubmitScore.
// These IDs are hardcoded only for testing the complete application flow.
// Later, real IDs should come from the events/categories/participants selected by the user.
// <hr /> visually separates the different components on the page.
// App.jsx does not contain the actual login/event/score logic; that logic belongs to the individual components.
// export default App makes App the component that can be loaded by the main React entry point.
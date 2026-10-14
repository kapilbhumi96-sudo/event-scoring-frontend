import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import ScoreParticipantPage from './pages/ScoreParticipantPage'
import CreateEventPage from './pages/CreateEventPage'

function App() {
  return (
    <div id="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
        <Route path="/categories/:id/score/:participantId" element={<ScoreParticipantPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
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
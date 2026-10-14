# Event Scoring Platform — Frontend

A React application for a real-time competition scoring platform, with role-aware navigation for Organizers, Judges, and Participants, and a live-updating leaderboard powered by WebSocket.

## Features

* Separate Login and Signup pages with role selection
* Role-aware dashboard — Organizers, Judges, and Participants each see different tools and navigation
* Real event and category browsing (no manual IDs — everything is clickable)
* Mandatory category selection for participant registration
* Judge scoring screen showing real registered participants, not manually typed IDs
* Live leaderboard (Participant view) that updates instantly via WebSocket when a judge submits a score — no refresh needed

## Tech Stack

* React (Vite)
* react-router-dom
* axios
* sockjs-client + @stomp/stompjs (WebSocket/STOMP client)
* Plain CSS (dark theme, card-based layout)

## Running Locally

### Prerequisites

* Node.js (LTS)
* The backend running locally at `http://localhost:8080` — see the [backend README](https://github.com/kapilbhumi96-sudo/event-scoring-backend) for setup

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## User Roles

| Role        | Can do                                                            |
| ----------- | ----------------------------------------------------------------- |
| Organizer   | Create events, add categories, view registered participants       |
| Judge       | Browse categories, view real participants, submit scores          |
| Participant | Browse events, register for categories, view the live leaderboard |

## Project Structure

```text
src/
├── pages/
│   ├── Login
│   ├── Signup
│   ├── Dashboard
│   ├── Events
│   ├── Category
│   ├── Score
│   └── CreateEvent
├── Leaderboard.jsx  - WebSocket-connected live leaderboard component
└── index.css        - Global styling
```

## Backend

The companion Spring Boot backend for this project is here: [Event Scoring Platform — Backend](https://github.com/kapilbhumi96-sudo/event-scoring-backend)

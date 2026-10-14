import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

function Leaderboard({ categoryId }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected, watching category:', categoryId)
        stompClient.subscribe(`/topic/leaderboard/${categoryId}`, (message) => {
          const data = JSON.parse(message.body)
          console.log('Update received:', data)
          setEntries(data)
        })
      }
    })

    stompClient.activate()

    return () => {
      stompClient.deactivate()
    }
  }, [categoryId])

  return (
    <div className="card">
      <h2>Live Leaderboard</h2>
      {entries.length === 0 && <p className="message">Waiting for scores...</p>}
      <ol className="leaderboard">
        {entries.map((entry) => (
          <li key={entry.rank}>
            <span><span className="rank-badge">{entry.rank}</span>{entry.participantName}</span>
            <strong>{entry.finalScore.toFixed(2)}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Leaderboard                                  
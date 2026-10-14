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
        stompClient.subscribe(`/topic/leaderboard/${categoryId}`, (message) => {
          const data = JSON.parse(message.body)
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
    <div>
      <h2>Live Leaderboard</h2>
      {entries.length === 0 && <p>Waiting for scores...</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry.rank}>
            {entry.participantName} — {entry.finalScore.toFixed(2)}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Leaderboard
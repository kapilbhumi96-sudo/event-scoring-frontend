import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/api/ping')
      .then((response) => {
        console.log(response.data)
        setMessage(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div>
      <h1>Backend says: {message}</h1>
    </div>
  )
}

export default App
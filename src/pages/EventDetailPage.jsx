import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

function EventDetailPage() {
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const loadCategories = () => {
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:8080/api/events/${id}/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setCategories(response.data))
      .catch(() => setCategories([]))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    axios.get('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setUser(response.data))

    loadCategories()
  }, [id, navigate])

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setMessage('Category name cannot be empty')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:8080/api/events/${id}/categories`,
        { name: newCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewCategoryName('')
      setMessage('')
      loadCategories()
    } catch (error) {
      setMessage('Failed to add category')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Categories</h2>
        <p><Link to="/events">Back to Events</Link></p>
      </div>

      {user && user.role === 'ORGANIZER' && (
        <div className="card">
          <h2>Add a Category</h2>
          <input
            placeholder="Category name (e.g. Solo, Duet, Group)"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
          <p className="message error">{message}</p>
        </div>
      )}

      {categories.length === 0 && (
        <div className="card"><p>No categories yet for this event.</p></div>
      )}

      {categories.map((category) => (
        <div className="card" key={category.id}>
          <h2>{category.name}</h2>
          <Link to={`/categories/${category.id}`}>View Participants / Register</Link>
        </div>
      ))}
    </div>
  )
}

export default EventDetailPage
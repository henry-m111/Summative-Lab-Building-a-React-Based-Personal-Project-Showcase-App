import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3001/coffee/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setFormData(data)
      })
  }, [id])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleUpdate(e) {
    e.preventDefault()

    // Send PATCH request to update product
    fetch(`http://localhost:3001/coffee/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price)
      })
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setEditMode(false)
      })
  }

  function handleDelete() {
    fetch(`http://localhost:3001/coffee/${id}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/shop'))
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="product-detail">
      {!editMode ? (
        <div className="detail-view">
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <p>Origin: {product.origin}</p>

          <p>Price: ${product.price}</p>

          <button onClick={() => setEditMode(true)}>
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete
          </button>

          <button onClick={() => navigate('/shop')}>
            Back to Shop
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="edit-form"
        >
          <h2>Edit Product</h2>

          <div className="form-group">
            <label>Coffee Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Origin</label>

            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default ProductDetail
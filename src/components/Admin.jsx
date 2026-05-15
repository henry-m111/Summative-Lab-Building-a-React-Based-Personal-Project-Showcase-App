import { useState, useId } from 'react'
import { useProducts } from '../context/ProductContext'
import '../styles/Admin.css'

function Admin() {
  const { products, addProduct } = useProducts()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: ''
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // Generate unique IDs for form labels and inputs
  const nameId = useId()
  const descriptionId = useId()
  const originId = useId()
  const priceId = useId()

  function validate() {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Coffee name is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.origin) newErrors.origin = 'Origin is required'
    if (!formData.price) newErrors.price = 'Price is required'
    return newErrors
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Get next ID by finding max existing ID + 1
    const nextId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1

    const newProduct = {
      id: nextId,
      ...formData,
      price: parseFloat(formData.price)
    }

    fetch('http://localhost:3001/coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(data => {
        addProduct(data)
        setSuccessMessage('Product added successfully!')
        setFormData({ name: '', description: '', origin: '', price: '' })
        setErrors({})
      })
  }

  return (
    <div className="admin">
      <div className="form-container">
        <h2>Add New Coffee</h2>
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={nameId}>Coffee Name</label>
            <input
              id={nameId}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type here"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor={descriptionId}>Description</label>
            <input
              id={descriptionId}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type here"
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor={originId}>Origin</label>
            <input
              id={originId}
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Type here"
            />
            {errors.origin && <span className="error">{errors.origin}</span>}
          </div>
          <div className="form-group">
            <label htmlFor={priceId}>Price</label>
            <input
              id={priceId}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Type here"
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Admin
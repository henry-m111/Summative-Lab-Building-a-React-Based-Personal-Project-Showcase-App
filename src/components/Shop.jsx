import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import '../styles/Shop.css'

function Shop() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrigins, setSelectedOrigins] = useState([])

  useEffect(() => {
    // Fetch coffee products from JSON Server
    fetch('http://localhost:3001/coffee')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const origins = [...new Set(products.map(p => p.origin))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    const matchesOrigin =
      selectedOrigins.length === 0 ||
      selectedOrigins.includes(product.origin)

    return matchesSearch && matchesOrigin
  })

  function handleOriginChange(origin) {
    setSelectedOrigins(prev =>
      prev.includes(origin)
        ? prev.filter(o => o !== origin)
        : [...prev, origin]
    )
  }

  return (
    <div className="shop">
      <div className="sidebar">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="filters">
          {origins.map(origin => (
            <label key={origin}>
              <input
                type="checkbox"
                checked={selectedOrigins.includes(origin)}
                onChange={() => handleOriginChange(origin)}
              />

              {origin}
            </label>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop
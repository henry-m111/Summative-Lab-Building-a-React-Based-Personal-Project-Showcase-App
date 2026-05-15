import { useNavigate } from 'react-router-dom'
import '../styles/ProductCard.css'

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Origin: {product.origin}</p>
      <p>Price: ${product.price}</p>
    </div>
  )
}

export default ProductCard
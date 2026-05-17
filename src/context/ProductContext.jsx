import { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/coffee')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  function addProduct(product) {
    setProducts(prev => [...prev, product])
  }

  function updateProduct(updatedProduct) {
    setProducts(prev =>
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    )
  }

  function deleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
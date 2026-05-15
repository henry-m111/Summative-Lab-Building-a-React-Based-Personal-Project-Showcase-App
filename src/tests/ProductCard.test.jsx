import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Vanilla Bean',
    description: 'Medium Roast, nutty flavor',
    origin: 'Colombia',
    price: 10.00
  }

  it('renders product information', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.getByText('Medium Roast, nutty flavor')).toBeInTheDocument()
    expect(screen.getByText('Origin: Colombia')).toBeInTheDocument()
    expect(screen.getByText('Price: $10')).toBeInTheDocument()
  })
})
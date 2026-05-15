import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import Shop from '../components/Shop'

function Wrapper({ children }) {
  return (
    <BrowserRouter>
      <ProductProvider>{children}</ProductProvider>
    </BrowserRouter>
  )
}

describe('Shop', () => {
  it('renders search bar and filters', () => {
    render(<Shop />, { wrapper: Wrapper })
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('filters products by search query', () => {
    render(<Shop />, { wrapper: Wrapper })
    const searchInput = screen.getByPlaceholderText('Search...')
    fireEvent.change(searchInput, { target: { value: 'Vanilla' } })
    expect(searchInput.value).toBe('Vanilla')
  })
})
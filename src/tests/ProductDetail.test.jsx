import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import ProductDetail from '../components/ProductDetail'

// Mock useParams to return a product id
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn()
  }
})

function Wrapper({ children }) {
  return (
    <BrowserRouter>
      <ProductProvider>{children}</ProductProvider>
    </BrowserRouter>
  )
}

describe('ProductDetail', () => {
  it('renders loading state initially', () => {
    render(<ProductDetail />, { wrapper: Wrapper })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
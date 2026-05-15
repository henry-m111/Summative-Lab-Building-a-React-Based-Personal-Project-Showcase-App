import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductProvider } from '../context/ProductContext'
import Admin from '../components/Admin'

// Wrapper component to provide context
function Wrapper({ children }) {
  return <ProductProvider>{children}</ProductProvider>
}

describe('Admin', () => {
  it('renders the add product form', () => {
    render(<Admin />, { wrapper: Wrapper })
    expect(screen.getByText('Add New Coffee')).toBeInTheDocument()
    expect(screen.getByText('Coffee Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Origin')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
  })

  it('shows validation errors when form is submitted empty', () => {
    render(<Admin />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByText('Coffee name is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Origin is required')).toBeInTheDocument()
    expect(screen.getByText('Price is required')).toBeInTheDocument()
  })

  it('updates input values when typing', () => {
    render(<Admin />, { wrapper: Wrapper })
    const nameInput = screen.getAllByPlaceholderText('Type here')[0]
    fireEvent.change(nameInput, { target: { value: 'Test Coffee' } })
    expect(nameInput.value).toBe('Test Coffee')
  })
})
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductProvider } from '../context/ProductContext'
import Admin from '../components/Admin'

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  )
})

describe('Admin', () => {
  it('renders the add product form', () => {
    render(
      <ProductProvider>
        <Admin />
      </ProductProvider>
    )
    expect(screen.getByText('Add New Coffee')).toBeInTheDocument()
    expect(screen.getByText('Coffee Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Origin')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
  })

  it('shows validation errors when form is submitted empty', () => {
    render(
      <ProductProvider>
        <Admin />
      </ProductProvider>
    )
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByText('Coffee name is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Origin is required')).toBeInTheDocument()
    expect(screen.getByText('Price is required')).toBeInTheDocument()
  })

  it('updates input values when typing', () => {
    render(
      <ProductProvider>
        <Admin />
      </ProductProvider>
    )
    const nameInput = screen.getAllByPlaceholderText('Type here')[0]
    fireEvent.change(nameInput, { target: { value: 'Test Coffee' } })
    expect(nameInput.value).toBe('Test Coffee')
  })
})
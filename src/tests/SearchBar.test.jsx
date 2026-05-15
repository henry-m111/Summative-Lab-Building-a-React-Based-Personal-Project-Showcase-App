import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar searchQuery="" setSearchQuery={() => {}} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('calls setSearchQuery when typing', () => {
    const setSearchQuery = vi.fn()
    render(<SearchBar searchQuery="" setSearchQuery={setSearchQuery} />)
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Vanilla' }
    })
    expect(setSearchQuery).toHaveBeenCalledWith('Vanilla')
  })
})
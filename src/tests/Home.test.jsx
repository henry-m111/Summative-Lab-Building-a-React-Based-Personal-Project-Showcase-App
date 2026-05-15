import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../components/Home'

describe('Home', () => {
  it('renders the hero section', () => {
    render(<Home />)
    expect(screen.getByText('Coffee R Us')).toBeInTheDocument()
    expect(screen.getByText('The go to store for your coffee needs')).toBeInTheDocument()
  })
})
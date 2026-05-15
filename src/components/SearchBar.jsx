import { useRef, useEffect } from 'react'

function SearchBar({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null)

  // Auto-focus the search input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar"
    />
  )
}

export default SearchBar
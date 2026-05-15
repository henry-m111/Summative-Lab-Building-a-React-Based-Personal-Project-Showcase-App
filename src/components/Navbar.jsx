import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>
        Shop
      </NavLink>
      <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
        Admin Portal
      </NavLink>
    </nav>
  )
}

export default Navbar
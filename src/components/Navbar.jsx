import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">

      <div className="logo">
        AI Wardrobe
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Features</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>

<div
  className="hamburger"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</div>

      <Link to="/login">
        <button className="login-btn">
          Login
        </button>
      </Link>

    </nav>
  )
}

export default Navbar
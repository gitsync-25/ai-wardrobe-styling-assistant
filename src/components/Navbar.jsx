import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

function Navbar({
  navbarShadow,
  session
}) {

  const handleLogout = async () => {

  await supabase.auth.signOut();

  window.location.reload();
};
  const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav
  className={
    navbarShadow
      ? "navbar navbar-scrolled"
      : "navbar"
  }
>

      <div className="logo">
        AI Wardrobe
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
  <Link
    to="/"
    className={
      location.pathname === "/"
        ? "active-link"
        : ""
    }
  >
    Home
  </Link>
</li>
        <li>
  <a href="#features">
    Features
  </a>
</li>

<li>
  <a href="#about">
    About
  </a>
</li>

<li>
  <a href="#contact">
    Contact
  </a>
</li>
      </ul>

<div
  className="hamburger"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? "✕" : "☰"}
</div>

      {
  session ? (

    <button
      className="login-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  ) : (

    <Link to="/login">

      <button className="login-btn">
        Login
      </button>

    </Link>

  )
}
      <AnimatePresence>

  {menuOpen && (

    <>

      <motion.div
        className="menu-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMenuOpen(false)}
      ></motion.div>

      <motion.div
        className="mobile-menu"
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: 100,
        }}
        transition={{
          duration: 0.35,
        }}
      >

        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>

        <a
          href="#features"
          onClick={() => setMenuOpen(false)}
        >
          Features
        </a>

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>

        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
        >
          <button className="login-btn">
            Login
          </button>
        </Link>

      </motion.div>

    </>

  )}

</AnimatePresence>
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

  <Link
  to="/"
  onClick={() => setMenuOpen(false)}
>
  Home
</Link>

  <Link to="/">Features</Link>

  <Link to="/">About</Link>

  <Link to="/">Contact</Link>

  <Link
  to="/login"
  className={
    location.pathname === "/login"
      ? "active-link"
      : ""
  }
>
    <button>Login</button>
  </Link>

</div>

    </nav>
  );
}



export default Navbar;
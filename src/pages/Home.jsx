import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar'

function Home({ session }) {
  const [mousePosition, setMousePosition] = useState({
  x: 0,
  y: 0,
});
  const [navbarShadow, setNavbarShadow] = useState(false);
const [offsetY, setOffsetY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

useEffect(() => {

  const handleScroll = () => {

    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      (window.scrollY / totalHeight) * 100;

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);

}, []);
useEffect(() => {

  const handleTopButton = () => {

    if (window.scrollY > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }

  };

  window.addEventListener("scroll", handleTopButton);

  return () =>
    window.removeEventListener("scroll", handleTopButton);

}, []);

useEffect(() => {

  const handleParallax = () => {
    setOffsetY(window.scrollY);
  };

  window.addEventListener("scroll", handleParallax);

  return () =>
    window.removeEventListener("scroll", handleParallax);

}, []);

useEffect(() => {

  const handleNavbarShadow = () => {

    if (window.scrollY > 50) {
      setNavbarShadow(true);
    } else {
      setNavbarShadow(false);
    }

  };

  window.addEventListener("scroll", handleNavbarShadow);

  return () =>
    window.removeEventListener(
      "scroll",
      handleNavbarShadow
    );

}, []);

useEffect(() => {

  const handleMouseMove = (e) => {

    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

  };

  window.addEventListener(
    "mousemove",
    handleMouseMove
  );

  return () =>
    window.removeEventListener(
      "mousemove",
      handleMouseMove
    );

}, []);



  return (
  <motion.div
  initial={{ opacity: 0 }}
  
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
>
  <div
  className="cursor-glow"
  style={{
    left: mousePosition.x - 150,
    top: mousePosition.y - 150,
  }}
></div>
  <div
  className="scroll-progress"
  style={{ width: `${scrollProgress}%` }}
></div>
    <Navbar
  navbarShadow={navbarShadow}
  session={session}
/>

 <div className="home-container page-center">
  <div className="particles">

  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>

</div>
  <div className="gradient-circle gradient-1"></div>
  <div className="gradient-circle gradient-2"></div>

  <div
  className="hero-section"
  style={{
    transform: `translateY(${offsetY * 0.2}px)`
  }}
>
  <motion.div
  className="hero-badge"

  initial={{
    opacity: 0,
    y: -20,
  }}

  animate={{
    opacity: 1,
    y: 0,
  }}

  transition={{
    duration: 0.7,
  }}
>
  ✨ AI Powered Fashion Platform
</motion.div>

    <motion.h1
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  AI Wardrobe & Styling Assistant
</motion.h1>

    <motion.p
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
>
      Discover smart fashion recommendations, organize your wardrobe,
      and elevate your personal style with AI-powered assistance.
    </motion.p>

    <motion.button
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.6 }}
>
  Get Started →

</motion.button>
  </div>
  <div className="stats-section">

  <div className="stat-card">
    <h1>10K+</h1>
    <p>Fashion Recommendations</p>
  </div>

  <div className="stat-card">
    <h1>5K+</h1>
    <p>Registered Users</p>
  </div>

  <div className="stat-card">
    <h1>95%</h1>
    <p>Style Match Accuracy</p>
  </div>

</div>
</div>

<section className="features-section">

  <h2>Powerful AI Fashion Features</h2>

  <div className="features-grid">

  <motion.div
    className="feature-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    viewport={{ once: true }}
  >

    <div className="feature-icon">👕</div>

    <h3>Smart Outfit Suggestions</h3>

    <p>
      Get AI-generated outfit combinations based on your wardrobe and style.
    </p>

  </motion.div>


  <motion.div
    className="feature-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6, delay: 0.3 }}
    viewport={{ once: true }}
  >

    <div className="feature-icon">✨</div>

    <h3>Personal Style Analysis</h3>

    <p>
      Discover your fashion personality using advanced AI styling analysis.
    </p>

  </motion.div>


  <motion.div
    className="feature-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    viewport={{ once: true }}
  >

    <div className="feature-icon">🛍️</div>

    <h3>Wardrobe Organization</h3>

    <p>
      Organize and manage your clothing collection digitally with ease.
    </p>

  </motion.div>

</div>

</section>

<motion.footer

  className="footer"

  id="contact"

  initial={{
    opacity: 0,
    y: 80,
  }}

  whileInView={{
    opacity: 1,
    y: 0,
  }}

  transition={{
    duration: 0.8,
  }}

  viewport={{
    once: true,
  }}
>

  <div className="footer-logo">

    <h2>AI Wardrobe</h2>

    <p>
      Smart AI-powered fashion styling platform for the modern generation.
    </p>

  </div>

  <div className="footer-links">

    <h3>Quick Links</h3>

    <a href="#">Home</a>
    <a href="#">Features</a>
    <a href="#">About</a>
    <a href="#">Contact</a>

  </div>

  <div className="footer-socials">

    <h3>Follow Us</h3>

    <div className="social-icons">

      <span>📸</span>
      <span>🐦</span>
      <span>💼</span>

    </div>

  </div>

</motion.footer>

<AnimatePresence>

  {showTopBtn && (

    <motion.button
      className="scroll-top-btn"

      initial={{
        opacity: 0,
        scale: 0.5,
        y: 40,
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        scale: 0.5,
        y: 40,
      }}

      transition={{
        duration: 0.3,
      }}

      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      ↑
    </motion.button>

  )}

</AnimatePresence>

 </motion.div>
)
}

export default Home
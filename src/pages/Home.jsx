
import Navbar from '../components/Navbar'

function Home() {
  return (
  <>
    <Navbar />

 <div className="home-container page-center">
  <div className="gradient-circle gradient-1"></div>
  <div className="gradient-circle gradient-2"></div>

  <div className="hero-section">
    <h1>AI Wardrobe & Styling Assistant</h1>

    <p>
      Discover smart fashion recommendations, organize your wardrobe,
      and elevate your personal style with AI-powered assistance.
    </p>

    <button>Get Started</button>
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

    <div className="feature-card">

      <div className="feature-icon">👕</div>

      <h3>Smart Outfit Suggestions</h3>

      <p>
        Get AI-generated outfit combinations based on your wardrobe and style.
      </p>

    </div>

    <div className="feature-card">

      <div className="feature-icon">✨</div>

      <h3>Personal Style Analysis</h3>

      <p>
        Discover your fashion personality using advanced AI styling analysis.
      </p>

    </div>

    <div className="feature-card">

      <div className="feature-icon">🛍️</div>

      <h3>Wardrobe Organization</h3>

      <p>
        Organize and manage your clothing collection digitally with ease.
      </p>

    </div>

  </div>

</section>


  </>
)
}

export default Home
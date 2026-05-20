import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login-page">

      <div className="gradient-circle gradient-1"></div>
      <div className="gradient-circle gradient-2"></div>

      <div className="login-card">

        <h1>Create Account</h1>

        <p>
          Join the future of AI fashion styling.
        </p>

        <input
          type="text"
          placeholder="Enter your username"
        />

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Create password"
        />

        <button>
          Register
        </button>

        <span>
          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </span>

      </div>

    </div>
  )
}

export default Register
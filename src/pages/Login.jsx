import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Login to continue your AI fashion journey.</p>

        <form className="login-form">
          <input type="email" placeholder="Enter your email" />

          <input type="password" placeholder="Enter your password" />

          <button type="submit">Login</button>
        </form>

        <span className="register-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
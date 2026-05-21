import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../supabase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;
    }

    

    navigate("/");
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>
          Login to continue your AI fashion journey.
        </p>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Enter your email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            required
          />

          <input
            type="password"
            placeholder="Enter your password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            required
          />

          <button type="submit">

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        <p className="register-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
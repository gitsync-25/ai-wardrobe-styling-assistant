import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

const [username, setUsername] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {

  e.preventDefault();

  setLoading(true);

  const { data, error } =
    await supabase.auth.signUp({

      email,

      password,

      options: {

        data: {
          username,
        },

      },

    });

  setLoading(false);

  if (error) {

    alert(error.message);

    return;
  }

  navigate("/login");

};
  return (
    <div className="login-page">

      <div className="gradient-circle gradient-1"></div>
      <div className="gradient-circle gradient-2"></div>

      <div className="login-card">

        <h1>Create Account</h1>

        <p>
          Join the future of AI fashion styling.
        </p>
<form onSubmit={handleRegister}>
        <input
  type="text"
  placeholder="Enter your username"

  value={username}

  onChange={(e) =>
    setUsername(e.target.value)
  }

  required
/>

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
  placeholder="Create password"

  value={password}

  onChange={(e) =>
    setPassword(e.target.value)
  }

  required
/>

        <button type="submit">

  {
    loading
      ? "Creating..."
      : "Register"
  }

</button>
        </form>

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
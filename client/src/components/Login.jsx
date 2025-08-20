import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./utils/AuthContext";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setAuth(true);
      navigate("/dashboard");
    } else alert("Login failed");
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1 className="title">Walker</h1>
        <div className="form-cont">
          <h2 className="sign-in">Sign In</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Continue
            </button>
          </form>

          <h2 className="divider">or</h2>

          <div className="sign-up">
            <NavLink to="/signup"> Sign Up</NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

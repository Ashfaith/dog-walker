import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

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
      console.log("logged in, navigating to dashboard");
      navigate("/dashboard");
    } else alert("Login failed");
  };

  return (
    <>
      <h2>LOGIN</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.username}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Log In
        </button>
        <p>
          No account?
          <NavLink to="/signup"> Sign up!</NavLink>
        </p>
      </form>
    </>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ email, password });
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) navigate("/dahsboard");
    else alert("Login failed");
  };

  return (
    <>
      <h2>SIGN IN</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Log In
        </button>
      </form>
    </>
  );
}

export default Login;

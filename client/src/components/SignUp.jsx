import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    // lastName: "",
    email: "",
    pw: "",
  });
  const [confirm, setConfirm] = useState(null);

  const validatePassword = () => {
    if (confirm !== form.pw) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  const attemptLogin = async () => {
    const creds = { username: form.email, password: form.pw };

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(creds),
    });

    if (res.ok) {
      setAuth(true);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    const res = await fetch("http://localhost:3000/users/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      attemptLogin();
    } else alert("unable to sign up");
  };

  return (
    <>
      <h2>SIGN UP</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>First Name</label>
        <input
          type="text"
          name="first-name"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {/* <label>Last Name</label>
        <input
          type="text"
          name="last-name"
          placeholder="Enter last name"
          value={form.lastName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, lastName: e.target.value }))
          }
        /> */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.pw}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, pw: e.target.value }));
          }}
        />
        <label>Confirm password</label>
        <input
          type="password"
          name="confirm"
          placeholder="Cofirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUp;

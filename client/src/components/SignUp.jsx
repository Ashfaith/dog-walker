import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./utils/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
    console.log(form);
    if (!validatePassword()) return;
    const res = await fetch("http://localhost:3000/users/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      attemptLogin();
    } else alert(data.error[0].msg);
  };

  return (
    <>
      <h2>SIGN UP</h2>
      <form onClick={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="first-name"
          placeholder="First name"
          value={form.firstName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <input
          type="text"
          name="last-name"
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.pw}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, pw: e.target.value }));
          }}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Cofirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUp;

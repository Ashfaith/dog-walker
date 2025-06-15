import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/check", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAuth(data.loggedIn))
      .catch(() => setAuth(false));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

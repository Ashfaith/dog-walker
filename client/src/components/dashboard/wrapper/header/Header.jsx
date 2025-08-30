import "./header.css";
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState();

  const provideUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/get-user`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    provideUser();
  }, []);

  return (
    <header className="header">
      <h3>Walker</h3>
      <div>
        {!user ? (
          <div>Loading...</div>
        ) : (
          <div className="user-display">{user.firstName}</div>
        )}
      </div>
    </header>
  );
}

export default Header;

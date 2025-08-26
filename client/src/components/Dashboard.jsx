import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./dashboard/wrapper/header/Header";
import NavBar from "./dashboard/wrapper/navbar/NavBar";
import "./dashboard.css";

export const PostsContext = createContext();

function Dashboard() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/dashboard/display-posts", {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="layout">
      <Header className="header" />
      <PostsContext.Provider value={posts}>
        <main className="main">
          <Outlet />
        </main>
      </PostsContext.Provider>
      <NavBar />
    </div>
  );
}

export default Dashboard;

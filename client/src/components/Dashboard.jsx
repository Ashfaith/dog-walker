import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./dashboard/wrapper/header/Header";
import NavBar from "./dashboard/wrapper/navbar/NavBar";
import "./dashboard.css";

const strReverse = (str) => {
  return str.split("").reverse().join("");
};
export const PostsContext = createContext();

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/display-posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  if (posts) {
    posts.sort((a, b) =>
      strReverse(a.createdAt).localeCompare(
        strReverse(b.createdAt),
        undefined,
        { numeric: true }
      )
    );
  }

  return (
    <div className="layout">
      <Header className="header" />
      <PostsContext.Provider value={posts}>
        <main className="main">
          <div className="main-content">
          <Outlet />
          </div>
        </main>
      </PostsContext.Provider>
      <NavBar />
    </div>
  );
}

export default Dashboard;

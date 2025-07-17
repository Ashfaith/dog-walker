import { useContext } from "react";
import { WeatherContext } from "../utils/WeatherContext";
import { PostsContext } from "../Dashboard";

function Home() {
  const { weather } = useContext(WeatherContext);
  const posts = useContext(PostsContext);

  return (
    <>
      <div>
        {weather && weather.current ? (
          <div>
            <h1>Current conditions</h1>
            <p>{weather.current.condition.text}</p>
            <p>{weather.current.temp_c}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.userName}</h4>
              <p>{post.createdAt}</p>
              <h3>{post.title}</h3>
              <h5>{post.content}</h5>
              <h5>{post.distance}</h5>
              <h5>{post.time}</h5>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Home;

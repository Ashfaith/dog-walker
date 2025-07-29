import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../utils/WeatherContext";
import { PostsContext } from "../Dashboard";
import { walkingAdvice, dateConvert } from "../utils/helpers";
import "./home.css";

function Home() {
  const { weather } = useContext(WeatherContext);
  const posts = useContext(PostsContext);
  const [walkingConditions, setWalkingConditions] = useState();

  useEffect(() => {
    if (!weather?.current?.temp_c) return;

    const weatherData = {
      temp: weather.current.temp_c,
      currentCondition: weather.current.condition.text,
    };

    setWalkingConditions(walkingAdvice(weatherData));
  }, [weather]);

  return (
    <>
      <div>
        {weather && weather.current ? (
          <section className="post-cont forecast">
            <div className="forecast-content">
              <h4 className="forecast-heading">Todays walking forecast</h4>

              <div className="weather-cont">
                <div className="weather-data-box">
                  <h5>Temperature</h5>
                  <p>{weather.current.temp_c} C</p>
                </div>

                <div className="weather-data-box">
                  <h5>Conditions</h5>
                  <p>{weather.current.condition.text}</p>
                </div>
              </div>

              <div className="cond-text-cont">
                <p className="conditions-text">{walkingConditions}</p>
              </div>
            </div>
          </section>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <main>
        {console.log(posts)}
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-cont">
              <section className="content-container">
                <div className="post-left-side">
                  <div className="post-user-info">
                    <h4>{post.userName}</h4>
                    <p className="post-date">{dateConvert(post.created)}</p>
                  </div>

                  <div className="title-desc-cont">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.content}</p>
                  </div>
                </div>

                <div className="stats-cont">
                  <div className="stats-box">
                    <p>Distance</p>
                    <h5 className="post-distance">{post.distance}</h5>
                  </div>
                  <div className="stats-box">
                    <p>Time</p>
                    <h5 className="post-time">{post.time}</h5>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Home;

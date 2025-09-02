import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../utils/WeatherContext";
import { PostsContext } from "../Dashboard";
import { walkingAdvice, dateConvert } from "../utils/helpers";
import "./home.css";

function Home() {
  const { weather } = useContext(WeatherContext);
  const posts = useContext(PostsContext);
  const [walkingConditions, setWalkingConditions] = useState();

  const [sortedPosts, setSortedPosts] = useState(null);

  const sortDateDescending = (postsArr) => {
    const sortedArr = postsArr.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    return sortedArr;
  };

  useEffect(() => {
    const dateDescending = sortDateDescending(posts);
    setSortedPosts(dateDescending);
  }, [posts]);

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
      {console.log(weather)}
      <div>
        {weather && weather.current ? (
          <section className="forecast">
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

      <section className="posts-section">
        <ul className="posts-list">
          {!sortedPosts ? (
            <div>Getting posts</div>
          ) : (
            sortedPosts.map((post) => (
              <li key={post.id} className="post-card">
                <section className="content-container">
                  <div className="post-user-info">
                    <div className="name-date-container">
                      <h4>{`${post.firstName} ${post.lastName}`}</h4>
                    </div>
                    <div className="name-date-container">
                      <p className="post-date">{dateConvert(post.created)}</p>
                    </div>
                  </div>

                  <div className="title-desc-cont">
                    <h3 className="post-title">{post.title}</h3>
                  </div>

                  <div className="stats-cont">
                    <div className="stats-box">
                      <p>Distance</p>
                      <h5 className="post-distance">{post.distance}km</h5>
                    </div>
                    <div className="stats-box">
                      <p>Time</p>
                      <h5 className="post-time">{post.time}</h5>
                    </div>
                  </div>
                </section>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}

export default Home;

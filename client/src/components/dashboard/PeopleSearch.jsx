import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./peopleSearch.css";

function PeopleSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const searchUsers = async (e) => {
    e.preventDefault();
    console.log(searchValue);
    let request;
    let queryParam = "name";

    if (searchValue.includes("@")) {
      request = "http://localhost:3000/users/users-by-email";
      queryParam = "email";
    } else {
      request = "http://localhost:3000/users/users-by-name";
    }

    try {
      const res = await fetch(
        `${request}?${queryParam}=${encodeURIComponent(searchValue)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || `Server error: ${res.status}`);
      } else {
        setFoundUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendFollowRequest = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/followers/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`Follower request sent to ${id}`);
      } else {
        console.error(
          "Server returned an error:",
          res.status,
          data.message || data
        );
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
    }
  };

  return (
    <section className="search-content">
      <div className="search-container">
        <form onSubmit={(e) => searchUsers(e)}>
          <input
            className="search-people-bar"
            type="text"
            placeholder="Search people"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button className="search-button" type="submit">
            <IoIosSearch className="search-icon-overlay" />
          </button>
        </form>
      </div>
      <div className="result-container">
        <h5>Search results</h5>
        <ul>
          {console.log("users:", foundUsers)}
          {!foundUsers
            ? null
            : foundUsers.map((follower, index) => (
                <li className="found-user" key={index}>
                  <h4>{`${follower.firstName} ${follower.lastName}`}</h4>
                  {follower.follows === true && follower.followedBy === true ? (
                    <p>Watching your walks!</p>
                  ) : follower.follwedBy === true ? (
                    <FollowButton
                      onClick={() => sendFollowRequest(follower.id)}
                    />
                  ) : follower.follows === false ? (
                    <p>pending</p>
                  ) : (
                    <button onClick={() => sendFollowRequest(follower.id)}>
                      Follow
                    </button>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

export default PeopleSearch;

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FollowButton from "../utils/FollowButton";
import "./peopleSearch.css";

function PeopleSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const searchUsers = async (e) => {
    e.preventDefault();
    let request;
    let queryParam = "name";

    if (searchValue.includes("@")) {
      request = `${import.meta.env.VITE_API_URL}/users/users-by-email`;
      queryParam = "email";
    } else {
      request = `${import.meta.env.VITE_API_URL}/users/users-by-name`;
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/followers/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        }
      );
    } catch (err) {
      console.error("Network or parsing error:", err);
    }
  };

  return (
    <>
      <div className="search-wrapper">
        <div className="search-container">
          <form onSubmit={(e) => searchUsers(e)}>
            <input
              className="search-bar"
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
      </div>
      <section className="search-content">
        <div className="result-container">
          <h5>Search results</h5>
          <ul>
            {!foundUsers
              ? null
              : foundUsers.map((follower, index) => (
                  <li className="found-user" key={index}>
                    <h4>{`${follower.firstName} ${follower.lastName}`}</h4>
                    <div className="follow-action-container">
                      {follower.following === false ? (
                        <p>pending</p>
                      ) : !follower.following ? (
                        <FollowButton
                          follower={follower}
                          textTrue={"Requested"}
                          textFalse={"Follow"}
                          onClick={() => sendFollowRequest(follower.id)}
                        />
                      ) : (
                        <p>Following</p>
                      )}
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default PeopleSearch;

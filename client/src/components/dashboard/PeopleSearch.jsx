import { useState } from "react";

function PeopleSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const searchUsers = async (e) => {
    e.preventDefault();
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
    <>
      {console.log(foundUsers)}
      <div className="search-container">
        <form onSubmit={(e) => searchUsers(e)}>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul>
        {!foundUsers
          ? null
          : foundUsers.map((follower, index) => (
              <li key={index}>
                <h4>{follower.name}</h4>
                {follower.follows === true && follower.followedBy === true ? (
                  <p>Watching your walks!</p>
                ) : follower.follwedBy === true ? (
                  <button onClick={() => sendFollowRequest(follower.id)}>
                    Follow Back
                  </button>
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
    </>
  );
}

export default PeopleSearch;

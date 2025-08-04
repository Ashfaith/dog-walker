import { useState, useEffect } from "react";
import { Link } from "react-router";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import "./friends.css";

function Friends() {
  // get follower requests
  const [requests, setRequests] = useState(null);

  const showFollowRequests = async () => {
    const res = await fetch("http://localhost:3000/followers/view-requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setRequests(data);
    }
  };

  useEffect(() => {
    showFollowRequests();
  }, []);

  //get followers
  const [followers, setFollowers] = useState([]);

  const getFollowers = async () => {
    try {
      const res = await fetch("http://localhost:3000/followers/all-followers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setFollowers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  //send requests
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

  //handle follow requests
  const handleRequest = async (action, requestId) => {
    try {
      const res = await fetch(
        "http://localhost:3000/followers/action-request",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action, requestId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log(data);
      } else {
        console.error("Server error:", res.status, data?.message || data);
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
      console.log(err.message);
    }
  };

  return (
    <div className="friends-content">
      <Link to="/dashboard/people-search">
        <div className="search-container">
          <span className="search-icon">
            <IoIosSearch />
          </span>
          <input className="search-bar" placeholder="Search people" />
        </div>
      </Link>

      {!requests || requests.length <= 0 ? null : (
        <div className="requests-container">
          <h3>Requests</h3>
          <ul>
            {requests.map((request, index) => (
              <li className="request-alert" key={index}>
                <h4>{request.requesterName}</h4>
                <div className="button-container">
                  <button
                    className="accept"
                    onClick={() => handleRequest(true, request.requestId)}
                  >
                    Accept
                  </button>
                  <IoIosClose
                    className="deny-button"
                    onClick={() => handleRequest(false, request.requestId)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="followers-section">
        <h3>Followers</h3>
        <ul>
          {!followers
            ? null
            : followers.map((follower, index) => (
                <li key={index}>
                  <h4>{follower.name}</h4>
                  {follower.following === false ? (
                    <p>pending</p>
                  ) : !follower.following ? (
                    <button
                      onClick={() => sendFollowRequest(follower.followerId)}
                    >
                      Follow Back
                    </button>
                  ) : (
                    <p>Watching your walks!</p>
                  )}
                </li>
              ))}
        </ul>
      </section>
    </div>
  );
}

export default Friends;
